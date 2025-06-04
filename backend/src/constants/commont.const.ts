const uploadLoadOption = {
  uploadAvatar: {
		dirId: 'hjg',
    subDir: ["avatars"],
    maxFileSize: 3 * 1024 * 1024,
    allowedTypes: ["image/jpeg", "image/png", "image/jfif"],
    errorMsg: {
			allowedTypes: "Invalid file type. Only JPEG, PNG, and JFIF files are allowed.",
			noFile: 'File is required.',
      limitFileSize: "File size exceeds the 3MB limit.",
    },
  },
};
const UPLOAD_DIR = 'uploads'

export {
	uploadLoadOption,
	UPLOAD_DIR
}
