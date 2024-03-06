import React from "react";
import Mock from "mockjs";

export default function RenderTiming() {

    const [userInfo , setUserInfo] = React.useState([]);
    const ref = React.useRef(null);
    React.useEffect(() => {
        fetchUserInfo().then((data) => {
            setUserInfo(data);
            console.log(data);
        });
    }, []);

    const fetchUserInfo = async () => {
        // const response = await fetch("/users");
        // const users = await response.json();
        const {users} = Mock.mock({
            'users|10': [{
              'id|+1': 1,
              'name': '@name', // 随机生成姓名
              'message': Mock.Random.string(10), // 随机生成消息
            }]
          });
        return users;
    }

    const handleScroll = (e) => {
        if(ref.current.scrollTop === 0){
            fetchUserInfo()
                .then((newUserInfo) => {
                    console.log(ref.current.scrollHeight);
                    const beforeScrollHeight = ref.current.scrollHeight;
                    setUserInfo([...newUserInfo, ...userInfo]);
                    setTimeout(() => {
                        const afterScrollHeight = ref.current.scrollHeight;
                        console.log(ref.current.scrollHeight);
                        ref.current.scrollTop = afterScrollHeight - beforeScrollHeight;
                    },0);
                })                                        
        }else if(ref.current.scrollTop + ref.current.clientHeight === ref.current.scrollHeight){
            fetchUserInfo()
                .then((newUserInfo) => {
                    console.log(newUserInfo);
                    setUserInfo([...userInfo, ...newUserInfo]); 
                })
        }
    }
    return (
        <div>
            <div>
                <button onClick={fetchUserInfo}>Fetch User Info</button>
            </div>
            <div 
                style={{ 
                    maxHeight: '200px', 
                    overflowY: 'scroll' 
                }}
                onScroll={handleScroll}
                ref={ref}
                >
                <ul>
                    {userInfo.map((user,index) => (
                        <li 
                            key={index} 
                            style={{
                                backgroundColor: 'lightgray',
                            }}
                            >
                            <p>{user.name}</p>
                            <p>{user.message}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}