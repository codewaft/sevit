<?php

namespace App\Providers;

use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\Route;

class RouteServiceProvider extends ServiceProvider
{
    public const HOME = "/home";

    protected function configureRateLimiting()
    {
        RateLimiter::for("api", function (Request $request) {
            $key = $request->user() ? $request->user()->id : $request->ip();
            return Limit::perMinute(60)->by($key);
        });
    }

    public function boot()
    {
        $this->configureRateLimiting();
        $this->routes(function () {
            Route::prefix("api")
                ->middleware("api")
                ->group(base_path("routes/api.php"));
            Route::middleware("web")->group(base_path("routes/web.php"));
        });
        Route::pattern("id", "[0-9]+");
    }
}
