function subStractDate (dateStr){
    const date=new Date(dateStr)
    const now=new Date()
    return (now.valueOf()-date.valueOf())
}
export default subStractDate