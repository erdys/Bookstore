$(document).ready(function(){
    //Opis książki    
    $(document).on('click','.btn-book-show-description',function(){
        var bookID = $(this).data('id');
        var parent = $(this).parent().parent();
        $.ajax({
            url:`${API_HOST}/book/${bookID}`,
            method:'GET',
            dataType:'json'
        }).done(function(result){                
           parent.find('.book-description').html(result.success[0].description).show();
        });
    });
    $(document).on('click','.btn-book-remove',function(){
        var bookID = $(this).data('id');
        var parent = $(this).parent().parent().parent();
        $.ajax({
            url:`${API_HOST}/book/${bookID}`,
            method:'DELETE',
            dataType:'json'
        }).done(function(result){
           parent.remove();
        });
    });
    $(document).on('change','#bookEditSelect',function(){
        var optionSelected = $("option:selected", this);
        var bookID = this.value;
        // console.log(bookID);
        if (bookID > 0) {
            $.ajax({
                url:`${API_HOST}/book/${bookID}`,
                method:'GET',
                dataType:'json'
            }).done(function(result){
                $('#bookEdit').show();
                var bookID = $('#bookEdit').find('#id');
                var title = $('#bookEdit').find('#title');
                var description = $('#bookEdit').find('#description');
                bookID.val(result.success[0].id);
                title.val(result.success[0].title);
                description.val(result.success[0].description);
            });
        } else {
            $('#bookEdit').hide();
        }
    });
    
    //addBook()
    function addBook(book){
        var element = `<li class="list-group-item">
                        <div class="panel panel-default">
                            <div class="panel-heading">
                                <span class="bookTitle">${book.title}</span>
                                <button data-id="${book.id}" class="btn btn-danger pull-right btn-xs btn-book-remove"><i class="fa fa-trash"></i>
                                </button>
                                <button data-id="${book.id}" class="btn btn-primary pull-right btn-xs btn-book-show-description"><i class="fa fa-info-circle"></i>
                                </button>
                            </div>
                            <div class="panel-body book-description">${book.description}</div>
                        </div>
                    </li>`;
        var elementSelect = `<option value="${book.id}">${book.id} - ${book.title}</option>`;   
        $('#booksList').append(element);
        $('#bookEditSelect').append(elementSelect);
        console.log();
    }

    function addAuthor(author){
        var elementSelectA = `<option value="${author.id}">${author.id} - ${author.name} ${author.surname}</option>`;   
        $('#author_id').append(elementSelectA);
    }

    //Submit
    $('#bookAdd').on('submit',function(e){
        e.preventDefault();
        var title = $('#title').val();
        var author_id = $('#author_id').val();
        var description = $('#description').val();
        if(title.length==0 && description.length==0){
            return;
        }
        $.ajax({
            url:`${API_HOST}/book`,
            data:{
                title: title,
                author_id: author_id,
                description: description
            },
            method:"POST",
            dataType:"json"
        }).done(function(result){            
            addBook(result.success[0]);
        }).fail(function(xhr,cod){
            console.log(xhr,cod);
        })
    });

    $('#bookEdit').on('submit',function(e){
        e.preventDefault();
        var bookID = $('#bookEdit').find('#id').val();
        var title = $('#bookEdit').find('#title').val();
        var description = $('#bookEdit').find('#description').val();
        if(title.length==0 && description.length==0){
            return;
        }
        $.ajax({
            url:`${API_HOST}/book/${bookID}`,
            data:{
                title: title,
                description: description
            },
            method:"PATCH",
            dataType:"json"
        }).done(function(result){
            // $('#bookEdit').hide();
            window.location.reload(true);
        }).fail(function(xhr,cod){
            console.log(xhr,cod);
        })       
    });
    //Pobranie książek
    $.ajax({
        url:`${API_HOST}/book`,
        method:'GET',
        dataType:'json'
    }).done(function(result){
        result.success.forEach((e)=>addBook(e));
        result.success.forEach((e)=>addAuthor(e));
    });
});