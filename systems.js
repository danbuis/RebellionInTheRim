/*JSON block of system info.  Data is stored here as opposed to the DB
because it is static, and universal across all campaigns. The only dynamic
bit of systems is who owns them, which is stored in the campaign model*/

var Systems = [
    {
        "SystemName" : "Ord Mantell",
        "StrategicEffect":["Repair Yards"],
        "Points" : 1,
        "Area" :[5, 1]
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
    },
    {
        "SystemName" : "Concord Dawn",
        "StrategicEffect":["Skilled Spacers"],
        "Points" : 1,
        "Area" :[1, 2]
    },
    {
        "SystemName" : "Atollon",
        "StrategicEffect":["Destiny"],
        "Points" : 0,
        "Area" :[2]
    },
    {
        "SystemName" : "Felucia",
        "StrategicEffect":["Resources"],
        "Points" : 1,
        "Area" :[2]
    },
    {
        "SystemName" : "Mon Cala",
        "StrategicEffect":["Skilled Spacers", "Repair Yards"],
        "Points" : 2,
        "Area" :[2]
    },
    {
        "SystemName" : "Raxus Prime",
        "StrategicEffect":[],
        "Points" : 0,
        "Area" :[2]
    },
    {
        "SystemName" : "Yavin",
        "StrategicEffect":[],
        "Points" : 0,
        "Area" :[2]
    },
    {
        "SystemName" : "Lothal",
        "StrategicEffect":["Resources"],
        "Points" : 1,
        "Area" :[2, 3]
    },
    {
        "SystemName" : "Kessel",
        "StrategicEffect":["Resources"],
        "Points" : 1,
        "Area" :[3]
    },
    {
        "SystemName" : "Montross",
        "StrategicEffect":["Skilled Spacers"],
        "Points" : 1,
        "Area" :[3]
    },
    {
        "SystemName" : "Nal Hutta",
        "StrategicEffect":["Ally", "Spynet"],
        "Points" : 1,
        "Area" :[3]
    },
    {
        "SystemName" : "Rodia",
        "StrategicEffect":["Skilled Spacers", "Diplomats"],
        "Points" : 2,
        "Area" :[3]
    },
    {
        "SystemName" : "Saleucami",
        "StrategicEffect":[],
        "Points" : 1,
        "Area" :[3]
    },
    {
        "SystemName" : "Nar Shaddaa",
        "StrategicEffect":["Repair Yards"],
        "Points" : 1,
        "Area" :[3, 4]
    },
    {
        "SystemName" : "Geonosis",
        "StrategicEffect":[],
        "Points" : 1,
        "Area" :[4]
    },
    {
        "SystemName" : "Ryloth",
        "StrategicEffect":["Skilled Spacers", "Diplomats"],
        "Points" : 2,
        "Area" :[4]
    },
    {
        "SystemName" : "Smuggler's Run",
        "StrategicEffect":["Spynet"],
        "Points" : 1,
        "Area" :[4]
    },
    {
        "SystemName" : "Sullust",
        "StrategicEffect":["Skilled Spacers", "Resources"],
        "Points" : 2,
        "Area" :[4]
    },
    {
        "SystemName" : "Tatooine",
        "StrategicEffect":["Destiny"],
        "Points" : 0,
        "Area" :[4]
    },
    {
        "SystemName" : "Utapau",
        "StrategicEffect":[],
        "Points" : 1,
        "Area" :[4]
    },
    {
        "SystemName" : "Ring of Kafrene",
        "StrategicEffect":["Spynet"],
        "Points" : 1,
        "Area" :[4,5]
    },
    {
        "SystemName" : "Bespin",
        "StrategicEffect":["Resources"],
        "Points" : 1,
        "Area" :[5]
    },
    {
        "SystemName" : "Dagobah",
        "StrategicEffect":["Destiny"],
        "Points" : 0,
        "Area" :[5]
    },
    {
        "SystemName" : "Endor",
        "StrategicEffect":[],
        "Points" : 0,
        "Area" :[5]
    },
    {
        "SystemName" : "Hoth",
        "StrategicEffect":[],
        "Points" : 0,
        "Area" :[5]
    },
    {
        "SystemName" : "Mustafar",
        "StrategicEffect":["Resources"],
        "Points" : 1,
        "Area" :[5]
    }
]

export default Systems