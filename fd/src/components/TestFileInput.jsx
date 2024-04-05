
import { useForm } from 'react-hook-form';
import { uploadFile } from '../Api/exam/examService';




function TestFileInput() {
    const { register, handleSubmit } = useForm();

    const onSubmit = async (data) => {
        console.log(data);
        const formData = new FormData();
        formData.append('file', data.testFile[0]);

        await uploadFile(formData);
        // console.log(res);

    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
            <label htmlFor="fileInput">Upload a file:</label>
            <input type="file" id="fileInput" {...register('testFile')} />
            <button type="submit">Submit</button>
        </form>
    );
}

export default TestFileInput;
