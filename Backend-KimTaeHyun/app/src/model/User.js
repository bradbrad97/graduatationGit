"use strict";

const UserStorage = require("./UserStorage");

class User{
    constructor(req) {
        this.body = req.body;
        this.session = req.session;
        this.file = req.file;
    }

    async login(){
        const client= this.body;
        const session = this.session
        try {
            const {id,psword} = await UserStorage.getUserInfo(client.id);
        } catch(error) { //아이디가 db에 없을 때
            return {success: false, msg: "아이디 혹은 비밀번호가 틀렸습니다."};
        }
        if (session.user) {
            console.log('이미 로그인되어 미팅룸 페이지로 이동');
            return {success: true};
        }
        else if(id){
            if (id === client.id && psword === client.psword){
                return { success: true};
            }
            return {success: false, msg: "아이디 혹은 비밀번호가 틀렸습니다."};
        }

    }

    // async register() {
    //     const client = this.body;
    //     const file = this.file
    //     const files = {
    //         file1 : file[0],
    //         file2 : file[1],
    //     }
    //     const response = await UserStorage.save(client, files);
    //     return response;
    // }

}

module.exports = User;