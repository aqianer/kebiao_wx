// pages/login/index.js
import {
  loginRequest
} from "../../api/main.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    stuId: '',
    password: '',
    stuIdError: false,
    errorMsg: '账号密码不为空',
    passwordError: false,
    errorPasswordMsg: '密码小于6位',
    save: true,

  },

  // 在输入框为输入状态时，会触发bindinput绑定的getData事件
  getStuId(e) {
    let value = e.detail.value


    if (value == '') {
      // $("#stu").css('borderColor','red')
      this.data.stuIdError = true;

    } else {
      this.data.stuIdError = false;
    }
    this.setData({
      stuIdError: this.data.stuIdError
    })
  },
  getPassword(e) {
    let value = e.detail.value
    if (value.length < 6) {
      this.data.passwordError = true;
    } else {
      this.data.passwordError = false;
    }
    this.setData({
      passwordError: this.data.passwordError
    })
  },

  saveCheckBox() {
    this.setData({
      save: !this.data.save
    })
  },

  login() {
    // 地址指向问题
    const that = this
    // 发post请求到后端服务器
    const loginData = {
      stuId: that.data.stuId,
      password: that.data.password
    }
    // 判断是否空表单数据不允许发送请求
    if (loginData.stuId == '' || loginData.password == '') {
      wx.showToast({
        title: '请输入学号或密码',
        icon: 'none'
      })
      return
    }
    // wx.showToast({
    //   title:'登录中',
    //   icon:'loading'
    // })
    loginRequest(loginData).then(res => {
      console.log(res)
      if (res.code == 0) {
        // 将成功返回的token存储到本地
        wx.setStorageSync('token', res.data.cookie)
        // 是否记住账号密码
        if (that.data.save) {
          wx.setStorageSync('account', loginData)
        } else {
          wx.removeStorage({
            key: 'account',
          })
        }
        // 跳转页面
        // 成功则跳转页面
        setTimeout(() => {
          wx.reLaunch({
            url: '/pages/index/index',
          })
        }, 500)
        wx.showToast({
          title: '登录成功',
          icon: 'success'
        })
      } else {
        // 登录失败的场景
        wx.showToast({
          title: res.data.msg,
          icon: 'error'
        })
      }
    })
    // wx.request({
    //   url: "http://localhost:3000/login",
    //   data: loginData,
    //   method: 'POST',
    //   success(res) {}
    // })

  },

  init() {
    const accountCache = wx.getStorageSync('account')
    if (accountCache) {
      this.setData({
        ...accountCache
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.init()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})