<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    protected function schedule(Schedule $schedule)
    {
        $schedule
            ->command("queue:work --sleep=3 --tries=2 --max-time=60")
            ->everyMinute();
        $schedule->command("broadcast:process")->everyMinute();
    }

    protected function commands()
    {
        $this->load(__DIR__ . "/Commands");
        require base_path("routes/console.php");
    }
}
