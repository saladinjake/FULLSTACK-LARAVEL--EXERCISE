<?php

namespace App\Services;
use App\Http\Requests\CreateUserRequest;
abstract class BaseService
{
    abstract public function fetchAll();

    abstract public function fetchMany($begin, $perPage, $sortBy, $sortDirection);

    abstract public function create(CreateUserRequest $request);

    abstract public function fetchOne($id);

    abstract public function update(CreateUserRequest $request, $id);

    abstract public function delete($id);
}
