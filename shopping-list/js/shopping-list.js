$(document).ready( init );

function init() 
{
  $('ul').on('click', 'li', function(){
    $(this).toggleClass('done');
  });
  
  $('.button-add').click(addToList);
  $('input').keypress(function(e){
    if (e.which === 13)
    {
      addToList();
    }
  });
  
  $('ul').on('click', '.button-del', function(e){
    e.stopPropagation();
    $(this).parent().fadeOut(function(){
      $(this).remove();
    })
  });
}

function addToList()
{
    if ($('input').val() === '')
      return;
    
    $('ul').append('<li>'
      + '<i class="button-del fas fa-minus-circle"></i> ' 
      + $('input').val() 
      + '</li>'
    );
    $('input').val('');
}