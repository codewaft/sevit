<?php

namespace App\Services;

use League\Csv\Reader;
use League\Csv\Writer;

class Csv
{
    public static function parse($file)
    {
        $filepath = $file->getPathName();
        $csv = Reader::createFromPath($filepath, "r");
        return $csv->getRecords();
    }

    public static function build($data)
    {
        $csv = Writer::createFromString();
        $csv->insertAll($data);
        return $csv->toString();
    }
}
