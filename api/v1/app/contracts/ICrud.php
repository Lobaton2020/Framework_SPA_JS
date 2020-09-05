<?php

interface ICrud
{
    public function index($request = null);
    public function store($request = null, $files = null);
    public function edit($id = null);
    public function update($request = null, $files = null);
    public function delete($id = null);
}
