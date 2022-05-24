<?php

namespace App\Services;
use App\Http\Requests\CreateUserRequest;
use App\Http\Requests\UpdateUserRequest;
abstract class BaseService
{
    abstract public function fetchAll();

    abstract public function fetchMany($begin, $perPage, $sortBy, $sortDirection);

    abstract public function create(CreateUserRequest $request);

    abstract public function fetchOne($id);

    abstract public function update(UpdateUserRequest $request, $id);

    abstract public function delete($id);
}
