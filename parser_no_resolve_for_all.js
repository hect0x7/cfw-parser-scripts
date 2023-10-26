module.exports.parse = async (raw, { axios, yaml, notify, console }, { name, url, interval, selected }) => {
    const obj = yaml.parse(raw)

    let rules = obj.rules
    // let rules = [
    //     'IP-CIDR,123,123',
    // ]

    for (const index in rules) {
        const origRule = rules[index]

        if (!origRule.startsWith('IP-CIDR')) {
            continue;
        }

        if (origRule.endsWith(',no-resolve')) {
            continue
        }

        let newRule = origRule + ',no-resolve'

        console.log(`[${origRule}] -> [${newRule}]`)
        rules[index] = newRule
    }


    return yaml.stringify(obj)
}