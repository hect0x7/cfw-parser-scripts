module.exports.parse = async (raw, {axios, yaml, notify, console}, {name, url, interval, selected}) => {
    const obj = yaml.parse(raw)
    const noresolve = ',no-resolve'

    let rules = obj.rules
    // let rules = [
    //     'IP-CIDR,123,123',
    // ]

    for (const index in rules) {
        const origRule = rules[index]

        // GEOIP,CN,DIRECT,no-resolve
        if (origRule.startsWith('GEOIP,CN') && origRule.endsWith(noresolve)) {
            let newRule = origRule.replace(noresolve, "")
            rules[index] = newRule
            console.log(`remove： [${origRule}] -> [${newRule}]`)
            continue
        }

        // IP-CIDR,xxx,yyy,no-resolve
        if (!origRule.startsWith('IP-CIDR') || origRule.endsWith(noresolve)) {
            continue
        }

        let newRule = origRule + noresolve

        console.log(`[${origRule}] -> [${newRule}]`)
        rules[index] = newRule
    }


    return yaml.stringify(obj)
}