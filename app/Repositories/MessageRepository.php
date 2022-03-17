<?php

namespace App\Repositories;

use App\Models\Message;

class MessageRepository
{
    public function editOne($id, $data)
    {
        $message = Message::findOrFail($id);
        $message->update($data);
        return $message;
    }
}
