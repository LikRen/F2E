$( document ).ready(function() {
    $(document).on('click', '.mytask', function(e) {
        $(this).addClass('active');
        $(this).siblings().removeClass('active');
        $('.addRemark').removeClass('Switching');
        $('.remark').children().removeClass('matchLi');
        $('.remainCount').parent().addClass('active');
        $('.doneCount').parent().removeClass('active');
        checkBtn();
    });

    $(document).on('click', '.progressBtn', function(e) {
        $(this).addClass('active');
        $(this).siblings().removeClass('active');
        $('.added').removeClass("active");
        $('.addRemark').removeClass('addedMode');
        $('.addRemark').addClass('Switching');
        $('.remark').children().removeClass('matchLi');
        $('.remainCount').parent().addClass('active');
        $('.doneCount').parent().removeClass('active');
        var finBtn = document.querySelectorAll('.finnishBtn');
        var finBtnLen = finBtn.length;

        for(var i = 0; i < finBtnLen; i++){
            finBtn[i].getAttribute("checked");
            if( finBtn[i].getAttribute("checked") == "checked" ){
                finBtn[i].parentNode.parentNode.className += " matchLi";
            }
        }
        checkBtn();
    });

    $(document).on('click', '.completedBtn', function(e) {
        $(this).addClass('active');
        $(this).siblings().removeClass('active');
        $('.added').removeClass("active");
        $('.addRemark').removeClass('addedMode');
        $('.addRemark').addClass('Switching');
        $('.remark').children().removeClass('matchLi');
        $('.remainCount').parent().removeClass('active');
        $('.doneCount').parent().addClass('active');
        var finBtn = document.querySelectorAll('.finnishBtn');
        var finBtnLen = finBtn.length;

        for(var i = 0; i < finBtnLen; i++){
            finBtn[i].getAttribute("checked");
            if( finBtn[i].getAttribute("checked") == null ){
                finBtn[i].parentNode.parentNode.className += " matchLi";
            }
        }
        checkDoneBtn();
    });

    $(document).on('click', '.fa-star-o,.fa-star', function(e) {
        $(this).toggleClass('fa-star-o');
        $(this).toggleClass('fa-star');

        if( $(this).parent().hasClass('addTitle')){
            $(this).parent().toggleClass('active');
        }else if ( $(this).parent().hasClass('titleAndState')){
            if( $(this).parent('.titleAndState').hasClass('titleEditState') ){
                $(this).parent('.titleAndState').toggleClass('active');
            } else {
                $(this).parent().parent('li').toggleClass('active')
            }
    
            if( $(this).parent().parent('li').hasClass('order-12')){
                $(this).parent().parent('li').toggleClass('order-12');
                $(this).parent().parent('li').toggleClass('order-1');
            } else {
                $(this).parent().parent('li').toggleClass('order-12');
                $(this).parent().parent('li').toggleClass('order-1');
            }
        };
    });

    $(document).on('click', '.fa-trash-o', function(e) {
        $(this).parent().parent().remove();
    });

    $(document).on('change', '.addedCheckbox', function(e){
        if( $(this).attr('checked')){
            $(this).removeAttr("checked");
        } else {
            $(this).attr("checked","");
        };
    })

    $(document).on('click', '.addBtn', function(e) {
        var boxCheck = document.querySelector('.addedCheckbox');
        var boxCheckVal = boxCheck.getAttribute("checked");
        var starPoint = $('.addTitle').hasClass('active');
        var inputVal = $(".titleInput").val();
        var yearVal = $(this).parent().siblings('.addContent').find('.dateBlock').find(".year").val();
        var timeVal = $(this).parent().siblings('.addContent').find('.dateBlock').find(".hour").val();
        var fileVal = $(this).parent().siblings('.addContent').find('.fileBlock').find(".fileName").text();
        var textArerStr = $(this).parent().siblings('.addContent').find('.comment').find("textarea").val();
        var fileVerify;
        if( fileVal == 'Upload file.'){
            fileVerify = false;
        } else {
            fileVerify = true;
        }
        var verifyTimeItem = `
        <i class="fa fa-calendar stateFirstIcon" aria-hidden="true">
            <span>
                <span class="mouth" id="mouth">${yearVal? `${m}` : ""}</span>
                ${yearVal? `/` : ""}
                <span class="days">${yearVal? `${d}` : ""}</span>
            </span>
        </i>`
        var verifyFileItem = `<i class="fa fa-file-o" aria-hidden="true"></i>`
        var verifyTextareaItem = `<i class="fa fa-commenting-o" aria-hidden="true"></i>`
        var item = `          
        <li class="col-12 ${starPoint ? "active order-1" : "order-12"}">
            <div class="titleAndState">
                <input type="checkbox" class="finnishBtn" ${boxCheckVal}>
                <input type="text" class="modifyTitle" placeholder="Type Something Here...">
                <span class="remarkTitle">${inputVal ? `${inputVal}` : "Type Something Here"}</span>
                <i class="fa ${starPoint ? "fa-star" : "fa-star-o"}" aria-hidden="true"></i>
                <i class="fa fa-pencil" aria-hidden="true"></i>
                <i class="fa fa-trash-o" aria-hidden="true"></i>
            </div>
            <p class="remarkState">
                ${yearVal ? `${verifyTimeItem}` : ""}
                ${fileVerify ? `${verifyFileItem}` : ""}
                ${textArerStr ? `${verifyTextareaItem}` : ""}
            </p>
            <div class="editIng">
                <div class="dateBlock">
                    <i class="fa fa-calendar" aria-hidden="true"></i>
                    <span class="">Deadline</span>
                    <input type="date" class="year" value="${yearVal}" placeholder="yyyy/mm/dd">
                    <input type="time" class="hour" value="${timeVal}" placeholder="hh:mm">
                </div>
                <div class="fileBlock">
                    <span>File</span>
                    <i class="fa fa-file-o" aria-hidden="true"></i>
                    <a href="#" class="upload">+
                    <input type="file">
                    </a>
                    <span class="fileName">${fileVal}</span>
                </div>
                <div class="comment">
                    <span class="Comment">Comment</span>
                    <i class="fa fa-commenting-o" aria-hidden="true"></i>
                    <textarea name="comment" cols="30" rows="10" placeholder="Type your memo here...">${textArerStr}</textarea>
                </div>
                <div class="addButton">
                    <a href="#" class="cancleBtn cancleEditBtn"><span>x</span>Cancle</a>
                    <a href="#" class="saveBtn"><span>+</span> Save</a>
                </div>
            </div>
        </li>`
        $(".remark").append(item);
        $('.addTitle').removeClass('active');
        $('.addTitle').find(".fa-star").removeClass('fa-star').addClass('fa-star-o');
        $('.titleInput').val('');
        $(this).parent('.addButton').parent('.added').removeClass('active');
        $(this).parent('.addButton').siblings('.addContent').find('.dateBlock').find(".year").val('');
        $(this).parent('.addButton').siblings('.addContent').find('.dateBlock').find(".hour").val('');
        $(this).parent('.addButton').siblings('.addContent').find('.fileBlock').find(".fileName").text('Upload file.');
        $(this).parent('.addButton').siblings('.addContent').find('.comment').find("textarea").val('');
        $('.addRemark').removeClass('addedMode');
        checkBtn();
    });

    $(document).on('click', '.fa-pencil', function(e) {
        if( $(this).parent().hasClass('addTitle')){
            $(this).parent().parent().removeClass('.active')
            if ($(this).prev().hasClass("fa-star")){
                $(this).prev().removeClass("fa-star");
                $(this).prev().addClass("fa-star-o");
            }
        }else if ( $(this).parent().hasClass('titleAndState')){
            if( $(this).parent().parent('li').hasClass('active')){
                $(this).parent().parent('li').removeClass('active')
                $(this).parent('.titleAndState').addClass('active')
            } else if( $(this).parent('.titleAndState').hasClass('active') ){
                $(this).parent('.titleAndState').removeClass('active')
                $(this).parent().parent('li').addClass('active')
            }
            $(this).toggleClass('inEdit');
            $(this).siblings('.remarkTitle').toggleClass('spanDisapper');
            $(this).siblings('.modifyTitle').toggleClass('titleEditMode');
            $(this).parent('.titleAndState').siblings('.editIng').toggleClass('editMode');
            $(this).parent('.titleAndState').toggleClass('titleEditState');
            $(this).parent('.titleAndState').siblings('.remarkState').toggleClass('editDisapper');
        };
    });

    $(document).on('click', '.cancleEditBtn', function(e) {
        if( $(this).parent().parent().siblings('.titleAndState').hasClass('active')){
            $(this).parent().parent().siblings('.titleAndState').removeClass('active')
            $(this).parent().parent().parent('li').addClass('active')
        }
        $(this).parent('.addButton').parent('.editIng').siblings('.titleAndState').find('.fa-pencil').toggleClass('inEdit');
        $(this).parent('.addButton').parent('.editIng').toggleClass('editMode');
        $(this).parent('.addButton').parent('.editIng').siblings('.titleAndState').find('.remarkTitle').toggleClass('editState');
        $(this).parent('.addButton').parent('.editIng').siblings('.titleAndState').toggleClass('titleEditState');
        $(this).parent('.addButton').parent('.editIng').siblings('.remarkState').toggleClass('editDisapper');
        $(this).parent().parent().siblings('.titleAndState').find('.remarkTitle').removeClass("spanDisapper");
        $(this).parent().parent().siblings('.titleAndState').find('.modifyTitle').removeClass("titleEditMode");
    });

    $(document).on('click', '.saveBtn', function(e) {
        var originTitleVal = $(this).parent().parent().siblings('.titleAndState').find('.remarkTitle').text();
        var titleVal = $(this).parent().parent().siblings('.titleAndState').find('.modifyTitle').val();
        console.log(originTitleVal, titleVal)
        var yearVal = $(this).parent().siblings('.dateBlock').find(".year").val();
        var Arr = new Array;
        if(yearVal !== ""){
            Arr = yearVal.split("-");
        }else{
            Arr = "";
        }
        m = Arr[1];
        d = Arr[2];
        var fileVal = $(this).parent().siblings('.fileBlock').find(".fileName").text();
        var textArerStr = $(this).parent().siblings('.comment').find("textarea").val();
        var yearIcon= `
        <i class="fa fa-calendar stateFirstIcon" aria-hidden="true">
            <span>
                <span class="mouth" id="mouth">${yearVal? `${m}` : ""}</span>
                ${yearVal? `/` : ""}
                <span class="days">${yearVal? `${d}` : ""}</span>
            </span>
        </i>`
        var fileIcon = `<i class="fa fa-file-o" aria-hidden="true"></i>`
        var commentIcon = `<i class="fa fa-commenting-o" aria-hidden="true"></i>`

        if( $(this).parent().parent().siblings('.titleAndState').hasClass('active')){
            $(this).parent().parent().siblings('.titleAndState').removeClass('active')
            $(this).parent().parent().parent('li').addClass('active')
        };

        if ( originTitleVal == "Type Something Here..."){
            if( titleVal !== '' ) {
                $(this).parent().parent().siblings('.titleAndState').find('.remarkTitle').text(titleVal);
            };
        } else if ( originTitleVal){
            if( titleVal !== '' ) {
                $(this).parent().parent().siblings('.titleAndState').find('.remarkTitle').text(titleVal);
            };
        }

        if( yearVal !== '' ) {
            if( !$(this).parent('.addButton').parent('.editIng').siblings('.remarkState').find("i").hasClass('fa-calendar')){
                $(this).parent('.addButton').parent('.editIng').siblings('.remarkState').prepend(yearIcon);
            };
        };

        if( fileVal !== 'Upload file.' ) {
            if( !$(this).parent('.addButton').parent('.editIng').siblings('.remarkState').find("i").hasClass('fa-file-o')){
                if ( $(this).parent('.addButton').parent('.editIng').siblings('.remarkState').find("i").hasClass('fa-commenting-o') && !$(this).parent('.addButton').parent('.editIng').siblings('.remarkState').find("i").hasClass('fa-calendar')) {
                    $(this).parent('.addButton').parent('.editIng').siblings('.remarkState').prepend(fileIcon); 
                } else if ($(this).parent('.addButton').parent('.editIng').siblings('.remarkState').find("i").hasClass('fa-commenting-o') && $(this).parent('.addButton').parent('.editIng').siblings('.remarkState').find("i").hasClass('fa-calendar')) {
                    $(this).parent('.addButton').parent('.editIng').siblings('.remarkState').find('.fa-calendar').after(fileIcon);
                } else {
                    $(this).parent('.addButton').parent('.editIng').siblings('.remarkState').append(fileIcon);
                }
            };
        };

        if( textArerStr !== '' ) {
            if( !$(this).parent('.addButton').parent('.editIng').siblings('.remarkState').find("i").hasClass('fa-commenting-o')){
                $(this).parent('.addButton').parent('.editIng').siblings('.remarkState').append(commentIcon);
            };
        };
        $(this).parent('.addButton').parent('.editIng').siblings('.titleAndState').find('.remarkTitle').toggleClass('spanDisapper');
        $(this).parent('.addButton').parent('.editIng').siblings('.titleAndState').find('.modifyTitle').toggleClass('titleEditMode');
        $(this).parent('.addButton').parent('.editIng').siblings('.titleAndState').find('.fa-pencil').toggleClass('inEdit');
        $(this).parent('.addButton').parent('.editIng').toggleClass('editMode');
        $(this).parent('.addButton').parent('.editIng').siblings('.titleAndState').find('.remarkTitle').toggleClass('editState');
        $(this).parent('.addButton').parent('.editIng').siblings('.titleAndState').toggleClass('titleEditState');
        $(this).parent('.addButton').parent('.editIng').siblings('.remarkState').toggleClass('editDisapper');
        $(this).parent('.addButton').parent('.editIng').siblings('.remarkState').find('.mouth').text(m);
        $(this).parent('.addButton').parent('.editIng').siblings('.remarkState').find('.days').text(d);
    });

    $(document).on('change', '.upload input', function(e) {
        var file = $(this).val();
        var strFileName=file.replace(/^.+?\\([^\\]+?)(\.[^\.\\]*?)?$/gi,"$1");  //正则表达式获取文件名，不带后缀
        var FileExt=file.replace(/.+\./,"");
        $(this).parent('.upload').siblings('.fileName').text(strFileName + "." +FileExt);
    });

    $(document).on('click', '.addRemark', function(e) {
        $(this).addClass('addedMode');
        $(".added").toggleClass("active");
        $(this).siblings('.add').find('.addTitle').find('.fa-pencil').addClass('inEdit');
    });

    $(document).on('click', '.cancleBtn', function(e) {
        $(this).parent().parent('.added').toggleClass("active");
        $('.addRemark').removeClass('addedMode');
    });

    $(document).on('click', '.cancelEdit', function(e) {
        $(".added").toggleClass("active");
        $('.addRemark').removeClass('addedMode');
    });
    

    $(document).on('change', '.year', function(e) {
        var yearVal = e.target.value;
        var Arr = new Array;
        Arr = yearVal.split("-"); // 根据“-”分割
        m = Arr[1];
        d = Arr[2];
    });

    $(document).on('change', '.finnishBtn', checkBtn );

    function checkBtn() {
        var finBtn = document.querySelectorAll('.finnishBtn');
        var finBtnLen = finBtn.length;
        if( $(this).attr('checked')){
            $(this).removeAttr("checked");
        } else {
            $(this).attr("checked","");
        };

        var btnCount = 0;
        for(var i = 0; i < finBtnLen; i++){
            finBtn[i].getAttribute("checked");
            if( finBtn[i].getAttribute("checked") == null ){
                btnCount ++;
            }
            $(".remainCount").text(btnCount);
        }
    }

    function checkDoneBtn() {
        var finDoneBtn = document.querySelectorAll('.finnishBtn');
        var finDoneBtnLen = finDoneBtn.length;
        if( $(this).attr('checked')){
            $(this).removeAttr("checked");
        } else {
            $(this).attr("checked","");
        };

        var btnDoneCount = 0;
        for(var i = 0; i < finDoneBtnLen; i++){
            finDoneBtn[i].getAttribute("checked");
            if( finDoneBtn[i].getAttribute("checked") == "checked" ){
                btnDoneCount ++;
                console.log(btnDoneCount);
            }
            $(".doneCount").text(btnDoneCount);
        }
    }
    
    // var times = document.querySelectorAll('.hour');
    // var timesLen = times.length;
    // for( i = 0; i < timesLen; i++){
    //     times[i].addEventListener('change', getTime, false);
    // }

    // function getTime(e) {
    //     var timeVal = e.target.value;
    //     var ArrII = new Array;
    //     ArrII = timeVal.split(":"); // 根据“-”分割
    //     hh = ArrII[1];
    //     mm = ArrII[2];
    //     console.log(ArrII);
    // }
});