'use strict';

const mongoose = require('mongoose');
const Product = mongoose.model('Product');
const ValidationContract = require('../validators/fluentvalidator');

exports.get = (req, res, next) => {
    Product.find({}, "title price slug")
    .then(data => {
        res.status(200).send(data);
    }).catch(erro => {
        res.status(400).send(erro);
    });
}

exports.getBySlug = (req, res, next) => {
    Product.findOne({ 
        slug: req.params.slug,
        active: true}, "title description price slug tags")
    .then(data => {
        res.status(200).send(data);
    }).catch(erro => {
        res.status(400).send(erro);
    });
}

exports.getById = (req, res, next) => {
    Product.findById(req.params.id)
    .then(data => {
        res.status(200).send(data);
    }).catch(erro => {
        res.status(400).send(erro);
    });
}

exports.getByTag = (req, res, next) => {
    Product.find({
        active: true,
        tags: req.params.tag})
    .then(data => {
        res.status(200).send(data);
    }).catch(erro => {
        res.status(400).send(erro);
    });
}

exports.post = (req, res, next) => {
    let contract = new ValidationContract();
    contract.hasMinLen(req.body.title, 3, 'O título deve conter pelo menos 3 caracteres')
    contract.hasMinLen(req.body.slug, 3, 'O título deve conter pelo menos 3 caracteres')
    contract.hasMinLen(req.body.description, 3, 'O título deve conter pelo menos 3 caracteres')

    if( !contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;    
    }

    var product = new Product(req.body);
    // product.title = req.body.title;
    product
    .save()
    .then(x => {
        res.status(201).send({ message: 'Produto cadastado com sucesso!'});
    }).catch(erro => {
        res.status(400).send({ message: 'Falha ao cadastrar produto', data: erro});
    });
    
};

exports.put = (req, res, next) => {
    const id = req.params.id;
    res.status(201).send({ 
      id: id,
      item: req.body
    });
}

exports.put = (req, res, next) => {
    Product
        .findByIdAndUpdate(req.params.id, {
        $set: {
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            slug: req.body.slug
        }
    }).then( x => {
        res.status(200).send({
            message: 'Produto atualizado com sucesso!'
        });

    }).catch(erro => {
        res.status(400).send({
            message: 'Falha a atualizar produto',
            data: erro
        })
    })
}

exports.delete = (req, res, next) => {
    Product
        .findOneAndRemove(req.body.id)
        .then( x => {
        res.status(200).send({
            message: 'Produto removido com sucesso!'
        });

    }).catch(erro => {
        res.status(400).send({
            message: 'Falha ao remover produto',
            data: erro
        })
    })
};
