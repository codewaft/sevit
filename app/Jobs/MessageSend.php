<?php

namespace App\Jobs;

use Throwable;
use Exception;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\Middleware\WithoutOverlapping;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use App\Models\Message;
use App\Services\Twillio;
use App\Repositories\MessageRepository;

class MessageSend implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $message;
    protected $messageRepo;

    public function __construct(Message $message)
    {
        $this->messageRepo = new MessageRepository();
        $this->message = $message;
    }

    public function middleware()
    {
        return [new WithoutOverlapping($this->message->id)];
    }

    protected function applyTemplateVariables($body, $contactName)
    {
        return Str::replaceArray("{contact}", [$contactName], $body);
    }

    public function handle()
    {
        try {
            $name = $this->message->contact->name;
            $phone = $this->message->contact->phone;
            $body = $this->message->broadcast->template->content;
            $body = $this->applyTemplateVariables($body, $name);
            [$sendError, $id] = Twillio::sendMessage($phone, $body);
            $messageData = ["reference_id" => $id];
            if ($sendError) {
                $messageData["status"] = "failed";
                $this->messageRepo->editOne($this->message->id, $messageData);
                throw new Exception($sendError);
            }
            $messageData["status"] = "processed";
            $this->messageRepo->editOne($this->message->id, $messageData);
        } catch (Throwable $e) {
            Log::warning($e);
        }
    }
}
