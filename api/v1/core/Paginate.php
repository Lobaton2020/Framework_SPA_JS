<?php
class Paginate
{
    private $request;
    private $countRegisters;
    private $next_url;
    private $prev_url;
    private $current_page;
    private $per_page;
    private $total;

    public function __construct($request, $countRegisters, $size = 15)
    {
        $this->request = $request;
        $this->countRegisters = $countRegisters;
        $this->per_page = $size;
    }

    public function page()
    {
        $execededPage = false;
        $page = $this->validatePage();
        $page = filter_var($page, FILTER_SANITIZE_NUMBER_INT);


        $this->total = ceil($this->countRegisters / $this->per_page);
        $page = $page > $this->total ? $execededPage = true : $page;
        if ($execededPage) {
            exit(httpResponse(404, "error", "This paginate had exceded the number, page or registers not found")->json());
        }
        $this->current_page = $page == 0 ? 1 : $page;
        $this->prev_url = (($page - 1) > $this->total) ? null : $page - 1;
        $this->next_url = (($page + 1) > $this->total) ? null : $page + 1;
        $page = $page == 1 ? 0 : $page - 1;
        return $page * $this->per_page;
    }

    public function validatePage()
    {
        if (!empty($this->request)) {
            if (isset($this->request->page)) {
                return $this->request->page == "0" ? 1 : $this->request->page;
            }
        }
        return 1;
    }

    public function makeInfo($route)
    {
        return [
            "count" => $this->countRegisters,
            "total" => $this->total,
            "per_page" => $this->per_page,
            "current_page" => route($route . "?page=" . $this->current_page),
            "prev_url" => ($this->prev_url > 0) ? route($route . "?page=" . $this->prev_url) : false,
            "next_url" => ($this->next_url > 0) ?  route($route . "?page=" . $this->next_url) : false,
            "fist_url" => route($route . "?page=1"),
            "last_url" => route($route . "?page=" . $this->total),
        ];
    }
}
