$(document).ready(function(){

    $(document).on('click','.btn-author-remove',function(){
        var authorID = $(this).data('id');
        var parent = $(this).parent().parent().parent();
        $.ajax({
            url:`${API_HOST}/author/${authorID}`,
            method:'DELETE',
            dataType:'json'
        }).done(function(result){
           parent.remove();
        });
    });

    function addAuthor(author){
        var element = `<li class="list-group-item">
                            <div class="panel panel-default">
                                <div class="panel-heading"><span class="authorTitle">${author.name} ${author.surname}</span>
                                    <button data-id="${author.id}" class="btn btn-danger pull-right btn-xs btn-author-remove"><i
                                                class="fa fa-trash"></i></button>
                                </div>
                            </div>
                        </li>`;
        var elementSelect = `<option value="${author.id}">${author.id} - ${author.name} ${author.surname}</option>`;   
        $('#authorsList').append(element);
        $('#authorEditSelect').append(elementSelect);
    }

    $(document).on('change','#authorEditSelect',function(){
        var optionSelected = $("option:selected", this);
        var authorID = this.value;
        // console.log(authorID);
        if (authorID > 0) {
            $.ajax({
                url:`${API_HOST}/author/${authorID}`,
                method:'GET',
                dataType:'json'
            }).done(function(result){
                $('#authorEdit').show();
                var authorID = $('#authorEdit').find('#id');
                var name = $('#authorEdit').find('#name');
                var surname = $('#authorEdit').find('#surname');
                authorID.val(result.success[0].id);
                name.val(result.success[0].name);
                surname.val(result.success[0].surname);
            });
        } else {
            $('#authorEdit').hide();
        }
    });

    $('#authorAdd').on('submit',function(e){
        e.preventDefault();
        var name = $('#name').val();
        var surname = $('#surname').val();
        if(name.length==0 && surname.length==0){
            return;
        }
        $.ajax({
            url:`${API_HOST}/author`,
            data:{
                name: name,
                surname: surname
            },
            method:"POST",
            dataType:"json"
        }).done(function(result){            
            addAuthor(result.success[0]);
        }).fail(function(xhr,cod){
            console.log(xhr,cod);
        })
    });

    $('#authorEdit').on('submit',function(e){
        e.preventDefault();
        var authorID = $('#authorEdit').find('#id').val();
        var name = $('#authorEdit').find('#name').val();
        var surname = $('#authorEdit').find('#surname').val();
        if(name.length==0 && surname.length==0){
            return;
        }
        $.ajax({
            url:`${API_HOST}/author/${authorID}`,
            data:{
                name: name,
                surname: surname
            },
            method:"PATCH",
            dataType:"json"
        }).done(function(result){
            // $('#authorEdit').hide();
            window.location.reload(true);
        }).fail(function(xhr,cod){
            console.log(xhr,cod);
        })       
    });

    $.ajax({
        url:`${API_HOST}/author`,
        method:'GET',
        dataType:'json'
    }).done(function(result){
        result.success.forEach((e)=>addAuthor(e));
    });
});