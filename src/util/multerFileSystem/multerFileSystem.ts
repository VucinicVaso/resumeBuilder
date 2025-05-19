import multer from 'multer'

class MulterFileSystem {

    private fileTypes: Map<string, string>
    public upload: multer.Multer | undefined

    constructor(storageDestination: string) {
        this.fileTypes = this.setFileTypes()
        this.initMulterDiskStorage(storageDestination, this.fileTypes)
    }

    private setFileTypes() : Map<string, string> {
        return new Map<string, string>([
            [ 'image/png', 'png' ],
            [ 'image/jpeg', 'jpeg' ],
            [ 'image/jpg', 'jpg' ],
            [ 'image/webp', 'webp' ],
            [ 'application/pdf', 'pdf' ]
        ])
    }

    private initMulterDiskStorage(storageDestination: string, fileTypes: Map<string, string>): void {
        let multerStorageEngine: multer.StorageEngine = multer.diskStorage({
            destination(request, file, callback) {
                let destination: string = request.body.folder != undefined ? `${storageDestination!}/${request.body.folder}` : storageDestination!
                callback(null, destination!)
            },
            filename(request, file, callback) {
                //const basePath = `${req.protocol}://${req.get('host')}${storageDestination}/`
                let extension: string | undefined = fileTypes.get(file.mimetype)
                const fileName = file.originalname.split(' ').join('-')
                callback(null, `${fileName}-${Date.now()}.${extension}`)
            },
        })
        this.upload = multer({ storage: multerStorageEngine })
    }
    
}

export default MulterFileSystem