function func1() {
    try {
        func2()
    } catch (error) {
        throw error
    }
}
async function func2() {
    try {
        await func3()
    } catch (error) {
        console.log(error)
    }
}
async function func3() {
    await new Promise((resolve, reject) => {
        setTimeout(()=>{
            const r = Math.random();
            if(r<0.5){
                reject('error')
            } else {

            }
        }, 1000)
    })
}

func1()

//没有发生异常 正确返回结果

//发生了异常
