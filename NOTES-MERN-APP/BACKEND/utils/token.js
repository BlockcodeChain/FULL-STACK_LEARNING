import jwt from 'jsonwebtoken'

const gentoken=async (id)=>{
    return  jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:"10m"
    })
}
export default gentoken