<?php namespace App\Http\Controllers;

use App\Commands\StorePost;
use App\Http\Requests;
use App\Http\Requests\PostRequest;
use App\Repositories\PostsRepository;
use App\User;

class PostsController extends Controller
{
    /**
     * @var BlogRepository
     */
    private $repository;

    /**
     * @param PostsRepository $repository
     */
    public function __construct(PostsRepository $repository)
    {
        $this->repository = $repository;
        $this->middleware('auth', ['except' => ['index', 'show']]);
    }

    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index()
    {
        return response()->json($this->repository->getAll());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param User $user
     * @param PostRequest $request
     * @return Response
     */
    public function store(User $user, PostRequest $request)
    {
        $post = $this->repository->store($user, $request->all());

        if ($post === null)
            return response()->json('Failed to store post.', 304);

        return response()->json($post->toArray(), 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  string $slug
     * @return Response
     */
    public function show($slug)
    {
        $post = $this->repository->getBySlug($slug);

        if ($post === null)
            return response()->json('Not Found.', 404);

        return response()->json($post->toArray());
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  PostRequest $request
     * @param  string $slug
     * @return Response
     */
    public function update(PostRequest $request, $slug)
    {
        $post = $this->repository->update($request->all(), $slug);

        if ($post === null)
            return response()->json('Failed to update post.', 304);

        return response()->json($post->toArray());
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  string $slug
     * @return Response
     */
    public function destroy($slug)
    {
        if ($this->repository->delete($slug))
            return response()->json('Failed to delete post.', 304);

        return response()->json('Deleted post successfully.', 204);
    }

}
