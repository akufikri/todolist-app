<?php

namespace Modules\Todo\Services;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ValidationService
{
    public function validate(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|max:250',
            'description' => 'required'
        ], [
            'title.required' => 'Judul wajib di isi!',
            'title.max' => 'Judul melebihi batas karakter yang diizinkan.'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()->all()
            ], 422);
        }

        return true;
    }
}
