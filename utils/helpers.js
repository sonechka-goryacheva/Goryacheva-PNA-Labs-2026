export function isEqualTariffZone(zone1, zone2) {
    return zone1.title === zone2.title &&
           zone1.price === zone2.price &&
           zone1.maxWeight === zone2.maxWeight &&
           zone1.deliveryTime === zone2.deliveryTime;
}

export function getExcludedZones(allZones, filteredZones) {
    const filteredIds = new Set(filteredZones.map(zone => zone.id));
    return allZones.filter(zone => !filteredIds.has(zone.id));
}

export function mergeTariffData(...objects) {
    const result = {};
    for (const obj of objects) {
        for (const key in obj) {
            if (!(key in result)) {
                result[key] = obj[key];
            }
        }
    }
    return result;
}