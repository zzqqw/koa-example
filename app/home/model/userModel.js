
const mysql  =require('../../../lib/mysql');
const user = {
  /**
   * 根据用户名和密码查找用户
   * @param  {object} options 用户名密码对象
   * @return {object|null}         查找结果
   */
  async getOneByUserNameAndPassword( options ) {
    let _sql = `
    SELECT * from users where phone="${options.phone}" and pwd="${options.pwd}" limit 1`
    let result = await mysql.query( _sql )
    if ( Array.isArray(result) && result.length > 0 ) {
      result = result[0]
    } else {
      result = 'null'
    }
    return result
  },

  /**
   * 查找一个存在用户的数据
   * @param  {obejct} options 查找条件参数
   * @return {object|null}        查找结果
   */
  async getExistOne( options ) {
    // let _sql = `SELECT * from user_info where email="${options.email}" or name="${options.name}" limit 1`
    let _sql = `SELECT * from user_info where email="${options.phone}" limit 1`
    let result = await mysql.query( _sql )
    if ( Array.isArray(result) && result.length > 0 ) {
      result = result[0]
    } else {
      result = null
    }
    return result
  },

}
module.exports = user