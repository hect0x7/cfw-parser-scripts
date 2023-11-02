module.exports.parse = async (raw, { axios, yaml, notify, console }, { name, url, interval, selected }) => {
    const obj = yaml.parse(raw)

    const DIRECT = "DIRECT"
    const domains = `
    visualstudio.com
    vsassets.io
    default.exp-tas.com
    elemecdn
    ele.me
    wechat
    download.windowsupdate.com

    `
    .split('\n')
    .map(domain => domain.trim())
    .filter(domain => domain !== "") // 去除空行

    const newRules = domains.map(domain => `DOMAIN-KEYWORD,${domain},${DIRECT}`)
    obj.rules = [...newRules, ...obj.rules]

    return yaml.stringify(obj)
}