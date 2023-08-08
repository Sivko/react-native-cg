import { fields } from '../config'

export default function defaultInvoce() {
  return ({
    data: {
      type: 'deals',
      attributes: {
        name: '',
        customs: {},
      },
      "relationships": {
        "stage": {
          "data": {
            "type": "deal-stages",
            "id": fields["idStageInvoce"]
          }
        }
      }
    }
  })
}