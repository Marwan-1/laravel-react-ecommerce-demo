<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class ServeAndDev extends Command
{
    protected $signature = 'serve:dev';
    protected $description = 'Run php artisan serve and npm run dev simultaneously';

    public function handle()
    {
        $this->info('Starting Laravel development server and Vite...');
        
        // Start both processes
        $serveProcess = popen('php artisan serve 2>&1', 'r');
        $npmProcess = popen('npm run dev 2>&1', 'r');
        
        if ($serveProcess && $npmProcess) {
            $this->info('Both servers started successfully!');
            $this->info('Laravel: http://localhost:8000');
            $this->info('Vite: http://localhost:5173');
            
            // Keep reading output from both processes
            while (!feof($serveProcess) || !feof($npmProcess)) {
                if (!feof($serveProcess)) {
                    echo fgets($serveProcess);
                }
                if (!feof($npmProcess)) {
                    echo fgets($npmProcess);
                }
            }
            
            pclose($serveProcess);
            pclose($npmProcess);
        } else {
            $this->error('Failed to start one or both servers.');
        }
    }
}
