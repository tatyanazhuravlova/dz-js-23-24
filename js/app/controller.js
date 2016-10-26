define(
    'controller',
    [
        'jquery',
        'tmpl',
        'model',
        'view'
    ],
    function () {
        return {
            controller: function (model, view) {
                            var self = this;

                            view.elements.addBtn.on('click', addItem);
                            view.elements.input.on('keydown', function (e) {
                                if (e.which == 13) {
                                    addItem();
                                }
                            });

                            function addItem () {
                                var newItem = view.elements.input.val();
                                model.addItem(newItem);
                                view.renderList(model.data);
                                view.elements.input.val('');
                            }

                            view.elements.listContainer.on('click', '.item-delete', removeItem);

                            function removeItem () {
                                var item = $(this).attr('data-value');
                                model.removeItem(item);
                                view.renderList(model.data);
                            }
                            
                            view.elements.listContainer.on('dblclick', '.item-label', editItem);
                            function editItem (e) {
                                var target = $(event.target);
                                var value = $(this).text();
                                var itemText = $(this).siblings('.item-new-value').val(value);
                                var index = model.data.indexOf(target.attr('data-value'));
                                console.log(value);
                                console.log(index);
                                target.parent().addClass('editing');

                                $('.item-new-value').on('keydown', function (e) {
                                    var editedItem = itemText.val();
                                    if (e.which == 13) {
                                        model.editItem(index, editedItem);
                                        view.renderList(model.data);
                                        console.log(editedItem);
                                        console.log(model);
                                        target.parent().removeClass('editing');
                                    }
                                });
                                $('.item-new-value').on('focusout', function(e) {
                                    var editedItem = itemText.val();
                                    model.editItem(index, editedItem);
                                    view.renderList(model.data);
                                    console.log(editedItem);
                                    console.log(model);
                                    target.parent().removeClass('editing');
                                });
                            }
                        },
            };
    }
);
