<?php

require_once __DIR__ . "/vendor/autoload.php";

function handler($event, $context)
{
  $logger = $GLOBALS['fcLogger'];
  $logger->info('hello world');
  // Make a request to the GitHub API with a custom
  // header of "X-Trvial-Header: Just as a demo".
  $url = "https://api.github.com/users/nategood";
  $response = \Httpful\Request::get($url)
    ->expectsJson()
    ->withXTrivialHeader('Just as a demo')
    ->send();

  echo "{$response->body->name} joined GitHub on " .
    date('M jS', strtotime($response->body->created_at)) . "\n";
  return 'hello world';
}
