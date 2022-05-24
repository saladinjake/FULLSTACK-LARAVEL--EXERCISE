<?php

namespace App\Http\Controllers\V1;

use App\Http\Controllers\Controller;
use App\Services\V1\UserProfileService;
use App\Http\Requests\CreateUserRequest;
use App\Http\Requests\UpdateUserRequest;
use Illuminate\Http\Request;

class UsersController extends Controller
{
  public $users;

  public function __construct(UserProfileService $users)
  {
    $this->users = $users;
  }

  /**
   * @OA\Get(
   *      path="/users",
   *      operationId="userIndex",
   *      tags={"Blog"},
   *      summary="Authority: All | Gets all users",
   *      description="Retrieves all users record",
   *      @OA\Response(
   *          response=200,
   *          description="Post posts retrieved",
   *          @OA\JsonContent(ref="#/components/schemas/User")
   *       )
   *    )
   */
  public function index()
  {
      return $this->users->fetchAll();
  }

  /**
   * @OA\Post(
   *      path="/users",
   *      operationId="createUserPost",
   *      tags={"User"},
   *      summary="Authority:  Creates a user resource",
   *      description="Stores a new User",
   *      @OA\RequestBody(
   *          required=true,
   *          @OA\JsonContent(ref="#/components/schemas/CreateUserRequest")
   *      ),
   *      @OA\Response(
   *          response=201,
   *          description="User resource created",
   *          @OA\JsonContent(ref="#/components/schemas/User")
   *      ),
   *      @OA\Response(
   *          response="403",
   *          description="Unauthorized. User not with access role",
   *      ),
   *      @OA\Response(
   *          response=422,
   *          description="The given data was invalid.",
   *      ),
   *    )
   *
   * Store a newly created resource in storage.
   *
   * @param  \Illuminate\Http\CreateUserRequest $request
   * @return \Illuminate\Http\Response
   */
  public function store(CreateUserRequest $request)
  {
      return $this->users->create($request);
  }

  /**
   * @OA\Get(
   *     path="/users/{id}/edit",
   *     tags={"User"},
   *     summary="Authority: All | Get content of User",
   *     description="User id is compulsory",
   *     @OA\Parameter(
   *        name="id",
   *        description="User id",
   *        required=true,
   *        in="path",
   *        @OA\Schema(
   *            type="string"
   *        )
   *     ),
   *     @OA\Response(
   *        response=200,
   *        description="Post post retrieved",
   *        @OA\JsonContent(ref="#/components/schemas/User")
   *     ),
   *     @OA\Response(response="404", description="Resource not found"),
   *     @OA\Response(response="422", description="The given data was invalid.")
   * )
   */
  public function show($userId)
  {
      return $this->users->fetchOne($userId);
  }

  /**
   * @OA\Put(
   *      path="/users/update/{userId}",
   *      operationId="updateBlog",
   *      tags={"Blog"},
   *      summary="Updates a blog | Please use x-www-form-urlencoded for body",
   *      description="Update User profile post",
   *      @OA\Parameter(
   *        name="userId",
   *        description="userId is required",
   *        required=true,
   *        in="path",
   *        @OA\Schema(
   *            type="integer"
   *        )
   *      ),
   *      @OA\RequestBody(
   *          required=true,
   *          @OA\JsonContent(ref="#/components/schemas/UpdateUserRequest")
   *      ),
   *      @OA\Response(
   *          response=200,
   *          description="Post updated",
   *          @OA\JsonContent(ref="#/components/schemas/User")
   *      ),
   *      @OA\Response(
   *          response="403",
   *          description="Unauthorized. User not with access role",
   *      ),
   *      @OA\Response(
   *          response=404,
   *          description="Post not found",
   *       ),
   *      @OA\Response(
   *          response=422,
   *          description="The given data was invalid.",
   *      ),
   *    )
   * Update the specified resource in storage.
   *
   * @param  \Illuminate\Http\UpdateUserRequest $request
   * @param  \App\Models\User $user
   * @return \Illuminate\Http\Response
   */
  public function update(UpdateUserRequest $request, int $id)
  {
      return $this->users->update($request, $id);
  }

  /**
   * @OA\Delete(
   *     path="/users/{userId}/delete",
   *     operationId="deleteUser",
   *     tags={"Blog"},
   *     summary="Authority: Deletes a User",
   *     description="Deletes a User resource",
   *     @OA\Parameter(
   *        name="userId",
   *        description="User ID",
   *        required=true,
   *        in="path",
   *        @OA\Schema(
   *            type="integer"
   *        )
   *     ),
   *     @OA\Response(
   *         response=200,
   *         description="Post deleted successfully",
   *     ),
   *     @OA\Response(
   *         response="403",
   *         description="Unauthorized. User not with access role",
   *     ),
   *     @OA\Response(
   *         response=404,
   *         description="Post not found",
   *     ),
   *     @OA\Response(
   *         response=422,
   *         description="The given data was invalid.",
   *     ),
   *  )
   */
  public function destroy(int $id)
  {
      return $this->users->delete($id);
  }
}
