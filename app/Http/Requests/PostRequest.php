<?php namespace App\Http\Requests;

class PostRequest extends Request
{

    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return $this->user() != null;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'title'   => 'required|max:255|min:5',
            'excerpt' => 'required|max:300|min:5',
            'body'    => 'required|max:6000|min:5'
        ];
    }

}
