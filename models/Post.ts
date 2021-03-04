class Post {
    id:string
    groupId:string
    content:string
    ownerId:string

    constructor(id:string, groupId:string, content:string, ownerId:string) {
        this.id = id 
        this.groupId = groupId
        this.content = content
        this.ownerId = ownerId
    }
}

export default Post;