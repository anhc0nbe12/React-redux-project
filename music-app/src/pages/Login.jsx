import { useDispatch,useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { useNavigate} from 'react-router-dom'
import { reset_exclude_user } from '../features/user/userSlide'
import { Form, Input, Checkbox } from 'antd'
import {toast} from 'react-toastify'

function Login(){
   const dispatch = useDispatch()
   const [formData, setFormData] = useState('')
   const navigate = useNavigate()
   const {user, isSuccess, isError, message} = useSelector((state) => state.auth)
   useEffect(() => {
      if(user || isSuccess){
         navigate('/')
         dispatch(reset_exclude_user())
      }
      if(isError){
        toast.error(message)
      }
   },[user,isSuccess,navigate,isError,message])
   
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }
  const onChange = (e) =>{
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }
  const onFinish = ()=>{}
  return (
    <div style={{display:'flex',justifyContent:'center', alignItems:'center', height:'100vh'}}>
<Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      onChange={onChange}
      autoComplete="off"
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
        id='clientId'
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
        id='clientSecret'

      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        {/* <Button type="primary" htmlType="submit">
          Submit
        </Button> */}
        <a href={`https://accounts.spotify.com/authorize?client_id=${formData.basic_username}&scopes=user-read-playback-state%20user-modify-playback-state%20user-read-currently-playing%20streaming%20playlist-read-private%20user-library-read%20user-read-email%20user-read-private&redirect_uri=https://react-redux-project-self.vercel.app/&response_type=code`} className='btn btn-success btn-lg'>
          login
        </a>
      </Form.Item>
    </Form>
    </div>
    
  )
}
// function Login() {
//   const AUTH_URL =
//     'https://accounts.spotify.com/authorize?client_id=ac74a4f365ff4bdbb1d4815a04b34d2c&response_type=token&redirect_uri=http://localhost:3000&scope=streaming%20user-library-modify%20user-library-read%20user-modify-playback-state%20user-read-playback-state'

//   return (
//     <>
//       <a href={AUTH_URL} className="btn btn-success btn-lg ">
//         LOGIN TO SPOTIFY
//       </a>
//     </>
//   )
// }

export default Login
