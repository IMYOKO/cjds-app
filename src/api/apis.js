import BasicRequest from './index';
import { baseURL } from './config'

const request = new BasicRequest();

/**
 * 登录
 * @param {string} username 
 * @param {string} password 
 */
const login = (data) => {
    return request.post(`${baseURL}/AppLogin`, data);
}

/**
 * 注册
 */
const register = (data) => {
    return request.post(`${baseURL}/Register`, data);
}

/** 
 * 获取验证码
*/
const getSMS = (data) => {
    return request.post(`${baseURL}/GetSMS`, data);
}

/**
 * getUserInfo 获取用户信息
 * @param {string} tableId 0
 */
const getUserInfo = (data) => {
    return request.post(`${baseURL}/GetUserInfo`, data);
}

/**
 *  getGameTable 获取游戏桌信息
	返回值：
	GameTableList（集合）
	TableName:桌名
	OralTimes:口次
	PersonalRestriction:个人限注 格式(xxxx-xxxx)
	PersonalSpecialCodeLimit：个人特码限注
	IndividualToChildRestriction：个人对子限注
	LimitedPlatform：限台（单位：万）
	List（游戏记录集合 20个数组）
	Num：开奖号码
	DS：单双类型
 */
const getGameTable = (data) => {
    return request.post(`${baseURL}/GetGameTable`, data);
}

/**
 * getRankList 获取排名
 */
const getRankList = (data) => {
    return request.post(`${baseURL}/GetPM`, data);
}

/**
 * AddOrder 获取排名
 */
const addOrder = (data) => {
    return request.post(`${baseURL}/AddOrder`, data, true);
}

/**
 * getOrder 获取订单
 * @param {tableId}  
 */
const getOrder = (data) => {
    return request.post(`${baseURL}/GetOrder`, data, true);
}

/**
 * revoke 获取订单
 * @param {id}  
 */
const revoke = (data) => {
    return request.post(`${baseURL}/cd`, data, true);
}

/**
 * updateTKPassWord 修改提款密码
 * @param {Password}  
 * @param {Newpassword}  
 */
const updateTKPassWord = (data) => {
    return request.post(`${baseURL}/UpdateTKPassWord`, data, true);
}

/**
 * updatePassWord 修改密码
 * @param {Password}  
 * @param {Newpassword}  
 */
const updatePassWord = (data) => {
    return request.post(`${baseURL}/UpdatePassWord`, data, true);
}

/**
 * addRecharge 充值
 * Name：汇款人姓名（Type等于1的时候传值，不为1传个空字符过来）
 * BankName：汇款人银行（Type等于1的时候传值，不为1传个空字符过来）
 * BankFS：汇款方式（Type等于1的时候传值，不为1传个空字符过来）
 * Type：充值类型1银行卡 2支付宝 3微信
 * Money：充值金额
 */
const addRecharge = (data) => {
    return request.post(`${baseURL}/AddRecharge`, data, true);
}

/**
 * addWithdrawal 提现
 * Name：用户名
 * Bankname：银行名
 * Zh：支行信息
 * Bankno：银行号码
 * Money：提现金额
 * Tkmm：提款密码
 */
const addWithdrawal = (data) => {
    return request.post(`${baseURL}/AddWithdrawal`, data, true);
}

/**
 * getWithdrawal 获取账户信息
 * Banlance：用户余额
 * WithdrawalDQLS：当前流水
 * WithdrawalLS：所需流水
 * TXZMoney：提现中金额
 * YTXMoney：已提现金额
 */
const getWithdrawal = () => {
    return request.post(`${baseURL}/Withdrawal`, {}, true);
}

/**
 * getBankInfo 获取银行卡信息 收款方信息
 */
const getBankInfo = () => {
    return request.post(`${baseURL}/GetBankInfo`, {}, true);
}

/**
 * getZNX 获取小喇叭通知
 */
const getZNX = () => {
    return request.post(`${baseURL}/GetZNX`, {}, true);
}

/**
 * getGG 获取广告
 */
const getGG = () => {
    return request.post(`${baseURL}/GetGG`, {}, true);
}

/**
 * getKj 获取开奖时间
 */
const getKj = () => {
    return request.get(`${baseURL}/getKj`, {});
}

export default {
    login,
	register,
	getSMS,
	getUserInfo,
	getGameTable,
	getRankList,
	addOrder,
	getOrder,
	revoke,
	updateTKPassWord,
	updatePassWord,
	addRecharge,
	addWithdrawal,
	getWithdrawal,
	getBankInfo,
	getZNX,
	getGG,
	getKj
}