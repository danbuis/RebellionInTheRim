/*JSON block of system info.  Data is stored here as opposed to the DB
because it is static, and universal across all campaigns. The only dynamic
bit of systems is who owns them, which is stored in the campaign model*/

var Systems = [
    {
        "SystemName" : "Ord Mantell",
        "StrategicEffect":["Repair Yards"],
        "Points" : 1,
        "Area" :[1,5]
    },
    {
        "SystemName" : "Dantooine",
        "StrategicEffect":["Spynet"],
        "Points" : 1,
        "Area" :[1]
    },
    {
        "SystemName" : "Dathomir",
        "StrategicEffect":["Destiny"],
        "Points" : 0,
        "Area" :[1]
    },
    {
        "SystemName" : "Mandalore",
        "StrategicEffect":["Ally", "Repair Yards"],
        "Points" : 2,
        "Area" :[1]
    },
    {
        "SystemName" : "Mygeeto",
        "StrategicEffect":["Diplomats", "Resources"],
        "Points" : 1,
        "Area" :[1]
    }
]

export default Systems