import { Injectable } from '@angular/core';
import { filter as _filter, forEach as _forEach } from 'lodash-es';

@Injectable()
export class ArrayToTreeConverterService {
    createTree(
        array: any[],
        parentIdProperty,
        idProperty,
        parentIdValue,
        childrenProperty: string,
        fieldMappings
    ): any {
        let tree = [];

        let nodes = _filter(array, [parentIdProperty, parentIdValue]);

        _forEach(nodes, (node) => {
            let newNode = {
                data: node,
            };

            this.mapFields(node, newNode, fieldMappings);

            newNode[childrenProperty] = this.createTree(
                array,
                parentIdProperty,
                idProperty,
                node[idProperty],
                childrenProperty,
                fieldMappings
            );

            tree.push(newNode);
        });

        return tree;
    }

    mapFields(node, newNode, fieldMappings): void {
        _forEach(fieldMappings, (fieldMapping) => {
            if (!fieldMapping['target']) {
                return;
            }

            if (fieldMapping.hasOwnProperty('value')) {
                newNode[fieldMapping['target']] = fieldMapping['value'];
            } else if (fieldMapping['source']) {
                newNode[fieldMapping['target']] = node[fieldMapping['source']];
            } else if (fieldMapping['targetFunction']) {
                newNode[fieldMapping['target']] = fieldMapping['targetFunction'](node);
            }
        });
    }
}
