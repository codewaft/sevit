<?php

namespace App\Services;

use Illuminate\Support\Str;
use League\Csv\Reader;
use League\Csv\Writer;

class Csv
{
    protected static function parseRows($file)
    {
        $filepath = $file->getPathName();
        $csv = Reader::createFromPath($filepath, "r");
        return collect(iterator_to_array($csv->getRecords()));
    }

    protected static function getHeader($rows)
    {
        $trim = fn($value) => trim($value);
        $pairs = fn($value) => [Str::camel($value) => $value];
        return collect($rows->first())
            ->map($trim)
            ->flatMap($pairs)
            ->toArray();
    }

    protected static function getRecords($rows)
    {
        $rows->shift();
        $trim = fn($value) => trim($value);
        $trimRecord = fn($record) => collect($record)
            ->map($trim)
            ->toArray();
        return collect($rows)->map($trimRecord);
    }

    public static function parse($file)
    {
        $rows = self::parseRows($file);
        return [self::getHeader($rows), self::getRecords($rows)];
    }

    public static function build($headers, $rows)
    {
        $csv = Writer::createFromString();
        $csv->insertOne($headers);
        $csv->insertAll($rows);
        return $csv->toString();
    }
}
