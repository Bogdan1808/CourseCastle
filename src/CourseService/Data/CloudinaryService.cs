using CloudinaryDotNet;
using CloudinaryDotNet.Actions;

public class CloudinaryService
{
    private readonly Cloudinary _cloudinary;

    public CloudinaryService(IConfiguration configuration)
    {
        var account = new Account(
            configuration["Cloudinary:CloudName"],
            configuration["Cloudinary:ApiKey"],
            configuration["Cloudinary:ApiSecret"]
        );
        _cloudinary = new Cloudinary(account);
    }

    public async Task<ImageUploadResult> UploadImageAsync(IFormFile file)
    {
        var uploadParams = new ImageUploadParams()
        {
            File = new FileDescription(file.FileName, file.OpenReadStream()),
            Folder = "course-castle/images",
            Transformation = new Transformation().Width(800).Height(600).Crop("fill")
        };

        return await _cloudinary.UploadAsync(uploadParams);
    }

    public async Task<VideoUploadResult> UploadVideoAsync(IFormFile file)
    {
        var uploadParams = new VideoUploadParams()
        {
            File = new FileDescription(file.FileName, file.OpenReadStream()),
            Folder = "course-castle/videos"
        };

        return await _cloudinary.UploadAsync(uploadParams);
    }

    public async Task<DeletionResult> DeleteFileAsync(string publicId)
    {
        return await _cloudinary.DestroyAsync(new DeletionParams(publicId));
    }
}