<?php

namespace App\Repositories;

use App\Post;
use App\User;
use Illuminate\Support\Str;

class EloquentPostsRepository implements PostsRepository
{
    /**
     * @var Post
     */
    private $model;

    public function __construct(Post $model)
    {
        $this->model = $model;
    }

    /**
     * Retrieve all records.
     *
     * @return \Illuminate\Support\Collection
     */
    public function getAll()
    {
        return $this->model->all();
    }

    /**
     * Retrieve a record by it's slug.
     *
     * @param string $slug
     * @return \App\Post
     */
    public function getBySlug($slug = '')
    {
        return $this->model->where('slug', $slug)->first();
    }

    /**
     * Delete a record by it's slug.
     *
     * @param  string $slug
     * @return bool
     */
    public function delete($slug)
    {
        $post = $this->model->find($slug);

        if ($post === null)
            return true;

        return $post->delete();
    }

    /**
     * Store a record.
     *
     * @param  User $user
     * @param  array $data
     * @return Post
     */
    public function store(User $user, array $data)
    {
        return $this->model->create(array_merge($data, [
            'author_id' => $user->id,
            'slug'      => Str::slug($data['title'])
        ]));
    }

    /**
     * Update a record.
     *
     * @param  array $data
     * @param  string $slug
     * @return Post
     */
    public function update(array $data, $slug)
    {
        $post = $this->getBySlug($slug);

        if ($post === null)
            return null;

        $post->update($data);

        return $post;
    }
}