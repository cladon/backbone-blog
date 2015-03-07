<?php

namespace App\Repositories;

use App\Post;
use App\User;

interface PostsRepository
{
    /**
     * Retrieve all records.
     *
     * @return \Illuminate\Support\Collection
     */
    public function getAll();

    /**
     * Retrieve a record by it's slug.
     *
     * @param  string $slug
     * @return \App\Post
     */
    public function getBySlug($slug);

    /**
     * Store a record.
     *
     * @param  User  $user
     * @param  array $data
     * @return Post
     */
    public function store(User $user, array $data);

    /**
     * Update a record.
     *
     * @param  array  $data
     * @param  string $slug
     * @return Post
     */
    public function update(array $data, $slug);

    /**
     * Delete a record by it's slug.
     *
     * @param  string $slug
     * @return bool
     */
    public function delete($slug);
}
