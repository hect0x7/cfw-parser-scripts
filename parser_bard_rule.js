module.exports.parse = async (raw, {axios, yaml, notify, console}, {name, url, interval, selected}) => {
    const obj = yaml.parse(raw)
    const proxies = obj.proxies
    const proxyGroups = obj["proxy-groups"]
    const rules = obj.rules
    // const proxies = []
    // const proxyGroups = []
    // const rules = []

    let bardKey = "🤖 Bard"

    // 选出美国节点
    let USA_Proxies = []
    proxies.forEach(function (value) {
        if (value.name.includes("美国")) {
            USA_Proxies.push(value.name)
        }
    })

    // 追加代理组
    proxyGroups[0].proxies.unshift(bardKey)
    proxyGroups.push({
        name: bardKey,
        type: 'load-balance',
        url: 'http://www.google.com/generate_204',
        interval: 300,
        strategy: 'consistent-hashing',
        proxies: USA_Proxies,
    })

    // 追加策略
    rules.unshift(`DOMAIN-KEYWORD,bard,${bardKey}`)

    return yaml.stringify(obj)
}