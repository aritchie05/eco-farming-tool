/*! js-cookie v3.0.0-rc.0 | MIT */
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e=e||self,function(){var r=e.Cookies,n=e.Cookies=t();n.noConflict=function(){return e.Cookies=r,n}}())}(this,function(){"use strict";function e(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)e[n]=r[n]}return e}var t={read:function(e){return e.replace(/%3B/g,";")},write:function(e){return e.replace(/;/g,"%3B")}};return function r(n,i){function o(r,o,u){if("undefined"!=typeof document){"number"==typeof(u=e({},i,u)).expires&&(u.expires=new Date(Date.now()+864e5*u.expires)),u.expires&&(u.expires=u.expires.toUTCString()),r=t.write(r).replace(/=/g,"%3D"),o=n.write(String(o),r);var c="";for(var f in u)u[f]&&(c+="; "+f,!0!==u[f]&&(c+="="+u[f].split(";")[0]));return document.cookie=r+"="+o+c}}return Object.create({set:o,get:function(e){if("undefined"!=typeof document&&(!arguments.length||e)){for(var r=document.cookie?document.cookie.split("; "):[],i={},o=0;o<r.length;o++){var u=r[o].split("="),c=u.slice(1).join("="),f=t.read(u[0]).replace(/%3D/g,"=");if(i[f]=n.read(c,f),e===f)break}return e?i[e]:i}},remove:function(t,r){o(t,"",e({},r,{expires:-1}))},withAttributes:function(t){return r(this.converter,e({},this.attributes,t))},withConverter:function(t){return r(e({},this.converter,t),this.attributes)}},{attributes:{value:Object.freeze(i)},converter:{value:Object.freeze(n)}})}(t,{path:"/"})});

let fieldCount = 0;
let fields = Cookies.get('fields');
console.log('Fields cookie: ' + fields);
if (fields !== undefined) {
    fields = JSON.parse(fields);
    fieldCount = fields.length;
    populateFieldsFromCookie();
} else {
    addField();
}

function plantField(fieldId) {
    let xmlHttpRequest = new XMLHttpRequest();
    xmlHttpRequest.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            let responseJson = JSON.parse(this.responseText);
            let plantTimeSpan = $('#field' + fieldId + '-plantTime');
            plantTimeSpan.text(responseJson.plantTime);
            let nextHarvestSpan = $('#field' + fieldId + '-nextHarvest');
            nextHarvestSpan.text(responseJson.nextHarvest);
            document.getElementById('field' + fieldId + '-plantButton').innerHTML = 'Replant';
            document.getElementById('field' + fieldId + '-selfRegenFullyGrown').innerHTML = 'false';

            saveAllFieldsToCookie();
        }
    };

    xmlHttpRequest.open("POST", "/plantField", true);
    xmlHttpRequest.setRequestHeader("Content-type", "application/json");

    let cropSelect = document.getElementById('field' + fieldId + '-cropSelect');

    let field = getField(fieldId);
    field.plantTime = new Date().toTimeString().substring(0, 5);

    xmlHttpRequest.send(JSON.stringify(field));
}

function harvestField(fieldId) {
    let field = getField(fieldId);
    field.nextHarvest = new Date().toTimeString().substring(0, 5);

    $.ajax({
        url: "/harvestField",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(field),
        dataType: "json",
        cache: false,
    })
        .done(function (fieldResult) {
            let plantTimeSpan = $('#field' + fieldId + '-plantTime');
            plantTimeSpan.text(fieldResult.plantTime);
            if (fieldResult.plantTime === '') {
                $('#field' + fieldId + '-plantButton').text('Plant');
            }
            let nextHarvestSpan = $('#field' + fieldId + '-nextHarvest');
            nextHarvestSpan.text(fieldResult.nextHarvest);

            if (fieldResult.selfRegenFullyGrown) {
                $('#field' + fieldId + '-selfRegenFullyGrown').html('true');
            }

            let growthDuration = $('#field' + fieldId + '-growthDuration');
            growthDuration.html(formatDuration(fieldResult.growthTime));

            saveAllFieldsToCookie();
        });
}

function updateFieldNamePlaceholder(fieldId) {
    let field = getField(fieldId);
    console.log("Updating field name placeholder for field: " + field.plantedCropId);
    document.getElementById('field' + fieldId + '-fieldNameInput').placeholder =
        field.plantedCropId.substring(0, 1).toUpperCase() + field.plantedCropId.substring(1) + ' Field';
}

function updateFieldCrop(fieldId) {
    let cropSelect = document.getElementById('field' + fieldId + '-cropSelect');
    let selectedCropId = cropSelect.options[cropSelect.selectedIndex].value;

    $.ajax({
        url: "/allCrops",
        cache: false,
        dataType: "json"
    })
        .done(function (crops) {
            let currentCrop, biome, growthTime, i;
            for (i in crops) {
                currentCrop = crops[i];
                if (currentCrop.id === selectedCropId) {
                    biome = currentCrop.biome;
                    growthTime = currentCrop.growthTime;
                }
            }

            document.getElementById('field' + fieldId + '-biome').innerHTML = biome;
            document.getElementById('field' + fieldId + '-growthDuration').innerHTML = formatDuration(growthTime);
            document.getElementById('field' + fieldId + '-plantButton').innerHTML = 'Plant';
            let plantTimeSpan = $('#field' + fieldId + '-plantTime');
            plantTimeSpan.text('');
            let nextHarvestSpan = $('#field' + fieldId + '-nextHarvest');
            nextHarvestSpan.text('');

            updateFieldNamePlaceholder(fieldId);

            saveAllFieldsToCookie();
        });
}

function addField() {
    $.ajax({
        url: "/addField/" + fieldCount,
        cache: false,
        dataType: "html"
    })
        .done(function (html) {
            $('#fields-container').append($(html).filter('.row'));
            fieldCount++;
            updateFieldNamePlaceholder(fieldCount);
        })
}

function getField(fieldId) {
    let fieldName = document.getElementById('field' + fieldId + '-fieldNameInput').innerHTML;
    let cropSelect = document.getElementById('field' + fieldId + '-cropSelect');
    let plantTime = document.getElementById('field' + fieldId + '-plantTime').innerHTML;
    let nextHarvest = document.getElementById('field' + fieldId + '-nextHarvest').innerHTML;
    let selfRegenFullyGrown = document.getElementById('field' + fieldId + '-selfRegenFullyGrown').innerHTML;

    return {
        id: fieldId,
        fieldName: fieldName,
        plantedCropId: cropSelect.options[cropSelect.selectedIndex].value,
        plantTime: plantTime,
        nextHarvest: nextHarvest,
        selfRegenFullyGrown: selfRegenFullyGrown
    };
}

function formatDuration(duration) {
    let growthTime = duration.substring(0, 2) + ' Hrs ' + duration.substring(3, 5) + ' Min';
    if (growthTime.charAt(0) === '0') {
        return growthTime.substring(1);
    } else {
        return growthTime;
    }
}

function saveAllFieldsToCookie() {
    let fieldsArray = [];
    $('.field-row').each(function (index) {
        fieldsArray.push(getField(index+1));
    });
    Cookies.set('fields', JSON.stringify(fieldsArray), {expires: 30});
}

function populateFieldsFromCookie() {
    $.ajax({
        url: "/addFieldsFromCookie",
        method: "POST",
        cache: false,
        contentType: "application/json",
        data: JSON.stringify(fields)
    })
        .done(function (html) {
            $('#fields-container').append($(html).filter('.row'));
            for (let i = 1; i <= fieldCount; i++) {
                updateFieldNamePlaceholder(i);
                let plantTimeSpan = $('#field' + i + '-plantTime');
                if (plantTimeSpan.html() !== '') {
                    $('#field' + i + '-plantButton').text("Replant");
                }
            }
        })
}

function deleteField(fieldId) {
    $('#field' + fieldId).remove();
    fieldCount--;
    saveAllFieldsToCookie();
}

$(document).ready(function () {
    $('#new-field-button').click(function () {
        addField();
    });

    $('.field-name-input').on("focusout", function () {
        saveAllFieldsToCookie();
    })
});