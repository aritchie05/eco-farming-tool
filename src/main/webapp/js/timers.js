/*! js-cookie v3.0.0-rc.0 | MIT */
!function (e, t) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (e = e || self, function () {
        var r = e.Cookies, n = e.Cookies = t();
        n.noConflict = function () {
            return e.Cookies = r, n
        }
    }())
}(this, function () {
    "use strict";

    function e(e) {
        for (var t = 1; t < arguments.length; t++) {
            var r = arguments[t];
            for (var n in r) e[n] = r[n]
        }
        return e
    }

    var t = {
        read: function (e) {
            return e.replace(/%3B/g, ";")
        }, write: function (e) {
            return e.replace(/;/g, "%3B")
        }
    };
    return function r(n, i) {
        function o(r, o, u) {
            if ("undefined" != typeof document) {
                "number" == typeof (u = e({}, i, u)).expires && (u.expires = new Date(Date.now() + 864e5 * u.expires)), u.expires && (u.expires = u.expires.toUTCString()), r = t.write(r).replace(/=/g, "%3D"), o = n.write(String(o), r);
                var c = "";
                for (var f in u) u[f] && (c += "; " + f, !0 !== u[f] && (c += "=" + u[f].split(";")[0]));
                return document.cookie = r + "=" + o + c
            }
        }

        return Object.create({
            set: o, get: function (e) {
                if ("undefined" != typeof document && (!arguments.length || e)) {
                    for (var r = document.cookie ? document.cookie.split("; ") : [], i = {}, o = 0; o < r.length; o++) {
                        var u = r[o].split("="), c = u.slice(1).join("="), f = t.read(u[0]).replace(/%3D/g, "=");
                        if (i[f] = n.read(c, f), e === f) break
                    }
                    return e ? i[e] : i
                }
            }, remove: function (t, r) {
                o(t, "", e({}, r, {expires: -1}))
            }, withAttributes: function (t) {
                return r(this.converter, e({}, this.attributes, t))
            }, withConverter: function (t) {
                return r(e({}, this.converter, t), this.attributes)
            }
        }, {attributes: {value: Object.freeze(i)}, converter: {value: Object.freeze(n)}})
    }(t, {path: "/"})
});

const crops = [
    {
        "id": "agave",
        "name": "Agave",
        "biome": "Desert",
        "isSelfRegenerating": "false",
        "growthTime": "19:12",
    },
    {
        "id": "beans",
        "name": "Beans",
        "biome": "Forest",
        "isSelfRegenerating": "false",
        "growthTime": "19:12",
    },
    {
        "id": "beets",
        "name": "Beets",
        "biome": "Grassland",
        "isSelfRegenerating": "false",
        "growthTime": "19:12",
    },
    {
        "id": "bolete",
        "name": "Bolete Mushrooms",
        "biome": "Rainforest",
        "isSelfRegenerating": "false",
        "growthTime": "19:12",
    },
    {
        "id": "camas",
        "name": "Camas Bulbs",
        "biome": "Forest",
        "isSelfRegenerating": "false",
        "growthTime": "19:12",
    },
    {
        "id": "cookeina",
        "name": "Cookeina Mushrooms",
        "biome": "Rainforest",
        "isSelfRegenerating": "false",
        "growthTime": "19:12",
    },
    {
        "id": "corn",
        "name": "Corn",
        "biome": "Grassland",
        "isSelfRegenerating": "false",
        "growthTime": "19:12",
    },
    {
        "id": "crimini",
        "name": "Crimini Mushrooms",
        "biome": "Rainforest",
        "isSelfRegenerating": "false",
        "growthTime": "19:12",
    },
    {
        "id": "fiddleheads",
        "name": "Fiddleheads",
        "biome": "Forest",
        "isSelfRegenerating": "false",
        "growthTime": "19:12",
    },
    {
        "id": "fireweed",
        "name": "Fireweed Shoots",
        "biome": "Boreal Forest",
        "isSelfRegenerating": "false",
        "growthTime": "19:12",
    },
    {
        "id": "huckleberries",
        "name": "Huckleberries",
        "biome": "Forest",
        "isSelfRegenerating": "true",
        "growthTime": "19:12",
    },
    {
        "id": "papayas",
        "name": "Papayas",
        "biome": "Rainforest",
        "isSelfRegenerating": "true",
        "growthTime": "19:12",
    },
    {
        "id": "pineapples",
        "name": "Pineapples",
        "biome": "Rainforest",
        "isSelfRegenerating": "true",
        "growthTime": "19:12",
    },
    {
        "id": "pumpkins",
        "name": "Pumpkins",
        "biome": "Grassland",
        "isSelfRegenerating": "false",
        "growthTime": "19:12",
    },
    {
        "id": "rice",
        "name": "Rice",
        "biome": "Grassland",
        "isSelfRegenerating": "false",
        "growthTime": "19:12",
    },
    {
        "id": "taro",
        "name": "Taro Roots",
        "biome": "Rainforest",
        "isSelfRegenerating": "false",
        "growthTime": "19:12",
    },
    {
        "id": "tomatoes",
        "name": "Tomatoes",
        "biome": "Grassland",
        "isSelfRegenerating": "true",
        "growthTime": "19:12",
    },
    {
        "id": "wheat",
        "name": "Wheat",
        "biome": "Grassland",
        "isSelfRegenerating": "false",
        "growthTime": "19:12",
    },
    {
        "id": "pears",
        "name": "Prickly Pears",
        "biome": "Desert",
        "isSelfRegenerating": "true",
        "growthTime": "19:12",
    }
];

const fieldRowHtmlTemplate =
    '<div id="${field.rowId}" class="row row-padding bg-dark-elevated-2 row-border-bottom field-row">\n' +
    '    <div class="col d-flex active-cyan-input align-items-center">\n' +
    '        <label class="sr-only" for="${field.nameInputId}">Field Name Input</label>\n' +
    '        <input id="${field.nameInputId}" placeholder="${field.namePlaceholder}"\n' +
    '               class="input-dark-bg field-name-input active-cyan-input" type="text">\n' +
    '    </div>\n' +
    '    <div class="col d-flex align-items-center">\n' +
    '        <label class="sr-only" for="${field.cropSelectId}">Choose Crop</label>\n' +
    '        <select id="${field.cropSelectId}"\n' +
    '                class="custom-select bg-dark-elevated-3 text-light crop-select"\n' +
    '                onchange="updateFieldCrop(${field.id})">' +
    '        ${cropOptionsList}' +
    '        </select>\n' +
    '    </div>\n' +
    '    <div class="col d-flex align-items-center">\n' +
    '        <span id="${field.biomeId}">${field.biome}</span>\n' +
    '    </div>\n' +
    '    <div class="col d-flex align-items-center">\n' +
    '         <span id="${field.growthDurationSpan}">${field.growthDurationText}</span>\n' +
    '    </div>\n' +
    '    <div class="col d-flex align-items-center">\n' +
    '        <button id="${field.plantButton}" type="button"\n' +
    '                class="btn btn-outline-success margin-right"\n' +
    '                onclick="plantField(${field.id})">Plant\n' +
    '        </button>\n' +
    '        <span id="${field.plantTimeSpan}">${field.plantTimeText}</span>\n' +
    '    </div>\n' +
    '    <div class="col d-flex align-items-center">\n' +
    '        <button type="button" class="btn btn-outline-danger margin-right"\n' +
    '                onclick="harvestField(${field.id})">Harvest\n' +
    '        </button>\n' +
    '        <span id="${field.nextHarvestSpan}">${field.nextHarvestText}</span>\n' +
    '        <span id="${field.selfRegenFullyGrownSpan}" class="hidden">${field.selfRegenFullyGrownText}</span>\n' +
    '    </div>\n' +
    '    <div class="col-md-auto d-flex align-items-center">\n' +
    '        <span onclick="deleteField(${field.id})"\n' +
    '              class="material-icons md-24 md-light md-inactive pseudo-button">close</span>\n' +
    '    </div>\n' +
    '</div>';

let nextFieldId = 1;


function populateFieldRowTemplate(field) {
    console.log('Populating field row template for field ' + JSON.stringify(field));
    let fieldRowHtml = fieldRowHtmlTemplate;
    let baseFieldName = 'field' + field.id;
    fieldRowHtml = fieldRowHtml.replace('${field.rowId}', baseFieldName);
    fieldRowHtml = fieldRowHtml.replace(/\${field.nameInputId}/g  , baseFieldName + '-fieldName');
    fieldRowHtml = fieldRowHtml.replace('${field.namePlaceholder}',
        field.plantedCropId.substring(0, 1).toUpperCase() + field.plantedCropId.substring(1) + ' Field');
    fieldRowHtml = fieldRowHtml.replace(/\${field.cropSelectId}/g, baseFieldName + '-cropSelect');
    fieldRowHtml = fieldRowHtml.replace(/\${field.id}/g, field.id);
    let cropOptionsList = '';
    let plantedCrop = {biome: 'Grassland', growthTime: '19:12'};
    crops.forEach(function (crop) {
        if (crop.id === field.plantedCropId) {
            cropOptionsList += '<option value="' + crop.id + '" selected>' + crop.name + '</option>\n';
            plantedCrop = crop;
        } else {
            cropOptionsList += '<option value="' + crop.id + '">' + crop.name + '</option>\n';
        }
    });
    fieldRowHtml = fieldRowHtml.replace('${cropOptionsList}', cropOptionsList);
    fieldRowHtml = fieldRowHtml.replace('${field.biomeId}', baseFieldName + '-biome');
    fieldRowHtml = fieldRowHtml.replace('${field.biome}', plantedCrop.biome);
    fieldRowHtml = fieldRowHtml.replace('${field.growthDurationSpan}', baseFieldName + '-growthDuration');

    //Saving the fields to cookie wraps booleans in quotes, so we always have to treat it as a string
    if (field.selfRegenFullyGrown === 'true') {
        let hoursDuration = parseFloat(plantedCrop.growthTime.substring(0, 2)) + (parseFloat(plantedCrop.growthTime.substring(3, 5)) / 60);
        hoursDuration = hoursDuration / 2;
        let plainHours = hoursDuration.toFixed();
        let plainMinutes = ((hoursDuration - plainHours) * 60).toFixed();
        fieldRowHtml = fieldRowHtml.replace('${field.growthDurationText}', plainHours + ' Hrs ' + plainMinutes + ' Min');
    } else {
        let growthDurationText = plantedCrop.growthTime.substring(0, 2) + ' Hrs ' + plantedCrop.growthTime.substring(3, 5) + ' Min';
        fieldRowHtml = fieldRowHtml.replace('${field.growthDurationText}', growthDurationText);
    }
    fieldRowHtml = fieldRowHtml.replace('${field.plantButton}', baseFieldName + '-plantButton');
    fieldRowHtml = fieldRowHtml.replace('${field.plantTimeSpan}', baseFieldName + '-plantTime');
    fieldRowHtml = fieldRowHtml.replace('${field.plantTimeText}', field.plantTime);
    if (field.plantTime !== '') {
        fieldRowHtml = fieldRowHtml.replace('Plant', 'Replant');
    }
    fieldRowHtml = fieldRowHtml.replace('${field.nextHarvestSpan}', baseFieldName + '-nextHarvest');
    fieldRowHtml = fieldRowHtml.replace('${field.nextHarvestText}', field.nextHarvest);
    fieldRowHtml = fieldRowHtml.replace('${field.selfRegenFullyGrownSpan}', baseFieldName + '-selfRegenFullyGrown');
    fieldRowHtml = fieldRowHtml.replace('${field.selfRegenFullyGrownText}', field.selfRegenFullyGrown);
    $('#fields-container').append(fieldRowHtml);
}

function addField() {
    console.log('Adding field with id ' + nextFieldId);
    let cropNum = Math.floor(Math.random() * crops.length);
    let randomCrop = crops[cropNum];
    let field = {
        id: nextFieldId,
        fieldName: "",
        plantedCropId: randomCrop.id,
        plantTime: "",
        nextHarvest: "",
        selfRegenFullyGrown: false
    };
    populateFieldRowTemplate(field);
    nextFieldId++;
}

function deleteField(fieldId) {
    console.log('Deleting field ' + fieldId);
    $('#field' + fieldId).remove();
    saveAllFieldsToCookie();
}

function saveAllFieldsToCookie() {
    console.log('Saving all fields to cookie');
    let fields = [];
    $('.field-row').each(function () {
        let fieldId = $(this).prop("id");
        console.log('Saving field to cookie with id: ' + fieldId);
        fields.push(getField(fieldId));
    });
    Cookies.set('fields', JSON.stringify(fields), {expires: 30});
}

function getField(fieldId) {
    console.log('Getting field ' + fieldId);
    let fieldName = $('#' + fieldId + '-fieldNameInput').text();
    let plantedCropId = $('#' + fieldId + '-cropSelect option:selected').val();
    let plantTime = $('#' + fieldId + '-plantTime').text();
    let nextHarvest = $('#' + fieldId + '-nextHarvest').text();
    let selfRegenFullyGrown = $('#' + fieldId + '-selfRegenFullyGrown').text();

    let field = {
        id: fieldId.substring(5),
        fieldName: fieldName,
        plantedCropId: plantedCropId,
        plantTime: plantTime,
        nextHarvest: nextHarvest,
        selfRegenFullyGrown: selfRegenFullyGrown
    };
    console.log('Got field: ' + JSON.stringify(field));
    return field;
}

function plantField(numId) {
    console.log('Planting field' + numId);
    let fieldId = 'field' + numId;
    let field = getField(fieldId);
    field.plantTime = new Date().toTimeString().substring(0, 5);
    let crop = getCropById(field.plantedCropId);

    $('#' + fieldId + '-plantTime').text(field.plantTime);
    $('#' + fieldId + '-nextHarvest').text(calculateHarvestTime(field.plantTime, crop.growthTime));
    $('#' + fieldId + '-plantButton').text('Replant');
    $('#' + fieldId + '-selfRegenFullyGrown').text('false');

    saveAllFieldsToCookie();
}

function harvestField(numId) {
    console.log('Harvesting field' + numId);
    let fieldId = 'field' + numId;
    let field = getField(fieldId);
    field.nextHarvest = new Date().toTimeString().substring(0, 5);

    let plantedCrop = getCropById(field.plantedCropId);

    let plantTimeSpan = $('#' + fieldId + '-plantTime');
    let plantButton = $('#' + fieldId + '-plantButton');
    let nextHarvestSpan = $('#' + fieldId + '-nextHarvest');
    let selfRegenFullyGrownSpan = $('#' + fieldId + '-selfRegenFullyGrown');
    let growthDurationSpan = $('#' + fieldId + '-growthDuration');

    if (plantedCrop.isSelfRegenerating === 'true') {
        console.log('In isSelfRegenerating logic');

        let growthTime = plantedCrop.growthTime;
        //Cut growth duration in half and set self regen fully grown to true if it is the first harvest
        if (selfRegenFullyGrownSpan.text() !== 'true') {
            console.log('In already fully grown logic');
            selfRegenFullyGrownSpan.text('true');

            let hoursDuration = parseFloat(growthTime.substring(0, 2)) + (parseFloat(growthTime.substring(3, 5)) / 60);
            console.log('hoursDuration: ' + hoursDuration);
            hoursDuration = hoursDuration / 2;
            console.log('newHoursDuration: ' + hoursDuration);
            let plainHours = Math.floor(hoursDuration);
            console.log('plainHours: ' + plainHours);
            let plainMinutes = Math.round((hoursDuration - plainHours) * 60);
            console.log('plainMinutes: ' + plainMinutes);
            let strHours = '';
            let strMinutes = '';
            if (plainHours < 10) {
                strHours += '0';
            }
            strHours += plainHours;
            if (plainMinutes < 10) {
                strMinutes += '0';
            }
            strMinutes += plainMinutes;
            growthTime = strHours + ':' + strMinutes;
            growthDurationSpan.text(formatDuration(growthTime));
        }

        plantTimeSpan.text(field.nextHarvest);
        nextHarvestSpan.text(calculateHarvestTime(field.nextHarvest, growthTime));

    } else {
        plantTimeSpan.text('');
        plantButton.text('Plant');
        nextHarvestSpan.text('');
    }

    saveAllFieldsToCookie();
}

function calculateHarvestTime(plantTimeString, growthTimeString) {
    let plantTimeHours = parseInt(plantTimeString.substring(0, 2));
    let plantTimeMinutes = parseInt(plantTimeString.substring(3, 5));
    let growthTimeHours = parseInt(growthTimeString.substring(0, 2));
    let growthTimeMinutes = parseInt(growthTimeString.substring(3, 5));
    let nextHarvestHours = plantTimeHours + growthTimeHours;
    let nextHarvestMinutes = plantTimeMinutes + growthTimeMinutes;
    if (nextHarvestMinutes > 60) {
        nextHarvestHours++;
        nextHarvestMinutes -= 60;
    }
    if (nextHarvestHours > 23) {
        nextHarvestHours -= 24;
    }

    let nextHarvestString = '';
    if (nextHarvestHours < 10) {
        nextHarvestString += 0;
    }
    nextHarvestString += nextHarvestHours;
    nextHarvestString += ':';
    if (nextHarvestMinutes < 10) {
        nextHarvestString += 0;
    }
    nextHarvestString += nextHarvestMinutes;

    return nextHarvestString;
}

function updateFieldCrop(numId) {
    let fieldId = 'field' + numId;
    let newCropId = $('#' + fieldId + '-cropSelect option:selected').val();
    let newCrop = getCropById(newCropId);

    $('#' + fieldId + '-biome').text(newCrop.biome);
    $('#' + fieldId + '-growthDuration').text(formatDuration(newCrop.growthTime));
    $('#' + fieldId + '-plantButton').text('Plant');
    $('#' + fieldId + '-plantTime').text('');
    $('#' + fieldId + '-nextHarvest').text('');

    updateFieldNamePlaceholder(fieldId);
    saveAllFieldsToCookie();
}

function updateFieldNamePlaceholder(fieldId)
{
    console.log('Updating field name placeholder for ' + fieldId);
    let field = getField(fieldId);
    let newPlaceholder = field.plantedCropId.substring(0, 1).toUpperCase() + field.plantedCropId.substring(1) + ' Field';

    console.log(newPlaceholder);

    $('#' + fieldId + '-fieldName').prop('placeholder', newPlaceholder);
}

function formatDuration(duration) {
    let formattedDuration = '';

    if (duration.substring(0, 1) === '0') {
        formattedDuration += duration.substring(1, 2);
    } else {
        formattedDuration += duration.substring(0, 2);
    }
    formattedDuration += ' Hrs ';

    if (duration.substring(3, 4) === '0') {
        formattedDuration += duration.substring(4, 5);
    } else {
        formattedDuration += duration.substring(3, 5);
    }
    formattedDuration += ' Min';

    return formattedDuration;
}

function getCropById(cropId) {
    console.log('Getting crop by id ' + cropId);
    for (let i = 0; i < crops.length; i++) {
        let crop = crops[i];
        if (crop.id === cropId) {
            console.log('Got crop ' + JSON.stringify(crop));
            return crop;
        }
    }
    return undefined;
}

$(document).ready(function () {
    let fields = Cookies.get('fields');

    if (fields !== undefined) {
        console.log('Loaded fields: ' + fields);
        fields = JSON.parse(fields);
        if (fields.length > 0) {
            let lastFieldId = fields[fields.length - 1].id;
            console.log('Detected last field id: ' + lastFieldId);
            nextFieldId = parseInt(lastFieldId) + 1;
            fields.forEach(populateFieldRowTemplate);
        } else {
            console.log('Empty array found in cookie.');
            addField();
        }
    } else {
        console.log('No saved fields found in cookie.');
        addField();
    }

    document.getElementById('new-field-button').onclick = addField;
});