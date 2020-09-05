<?php

class LinkService extends Service implements ICrud
{
    public function __construct()
    {
        $this->authentication();
    }

    public function index($request = null)
    {
        return httpResponse(
            Link::paginate($request, 10),
            Link::infoPaginate("links")
        )->json();
    }
    public function store($request = null, $files = null)
    {
        $link = Link::create();
    }
    public function edit($id = null)
    {
    }
    public function update($request = null, $files = null)
    {
    }
    public function delete($id = null)
    {
    }
}
