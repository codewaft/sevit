<?php

namespace App\Console\Commands;

use Throwable;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;
use App\Jobs\MessageSend;
use App\Repositories\BroadcastRepository;

class BroadcastProcess extends Command
{
    protected $signature = "broadcast:process";
    protected $description = "Check scheduled broadcasts are ready to process and dispatch the messages to send queue";

    protected $broadcast;

    public function __construct(BroadcastRepository $broadcast)
    {
        parent::__construct();
        $this->broadcast = $broadcast;
    }

    public function handle()
    {
        try {
            $broadcasts = $this->broadcast->getAllReadyToProcess();
            $dispatchMessages = function ($broadcast) {
                $broadcast->messages->each(function ($message) {
                    MessageSend::dispatch($message);
                });
            };
            $broadcasts->each($dispatchMessages);
        } catch (Throwable $e) {
            Log::warning($e);
        }
    }
}
