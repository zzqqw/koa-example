const userModel = require('./../model/userModel');
const user = {

  /**
   * 数据库创建用户
   * @param  {object} model 用户数据模型
   * @return {object}       mysql执行结果
   */
  async create ( model ) {
    let result = await userModel.insertData( 'user_info', model )
    return result
  },

  /**
   * 登录业务操作
   * @param  {object} formData 登录表单信息
   * @return {object}          登录业务操作结果
   */
  async signIn( formData ) {
    return await userModel.getOneByUserNameAndPassword({
      'phone': formData.mobile,
      'pwd': formData.password
    })
  },
  /**
   * 查找存在用户信息
   * @param  {object} formData 查找的表单数据
   * @return {object|null}      查找结果
   */
  async getExistOne( formData ) {
    return await userModel.getOneByUserNameAndPassword({
      'phone': formData.mobile
    })
  },





}
module.exports = user