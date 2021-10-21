import React, { FC, useState } from 'react';
import { useQuery } from 'react-apollo';
import { Button, Layout, PageBlock, Table, Modal } from 'vtex.styleguide';
import helloworld from "./graphql/helloworld.gql";

const defaultSchema = {
  properties : {
    name: {
      title: "name",
      width: 300
    },
    value: {
      title: 'value',
      width: 100
    }
  }
}
const defaultItems = [
  {
    name: "luca",
    value: "200"
  },
  {
    name: "jose",
    value: "200"
  },
  {
    name: "james",
    value: "200"
  },
]

const Management: FC = () => {
  const {data, loading, refetch,  } = useQuery(helloworld)
  const [isOpen, setIsOpen] = useState(false)
  const [isFetching, setIsFetching] = useState(false)
  const handleToggle = () => {
    setIsOpen(!isOpen)
  }

  const handleFetch = async () => {
    setIsFetching(true)
    await refetch()
    setIsFetching(false)
  }

  return (
    <Layout fullWidth>
      <PageBlock 
      title="Welcome to management"
      subtitle="Have a nice day!"
      variation="full">
       <div className="br2 c-emphasis hover-c-emphasis active-c-emphasis dib mr5 mv0-active-b-emphasis">
        <h1>Look at me!</h1>
            </div>
        <p className="c-on-action-secondary">{loading ||isFetching ? "Loading..." : data?.helloworld}</p>
        <div className="flex mv6 ">
      <div className="mr5">
        <Button 
        variant="secondary"
        onClick={handleToggle}
        >
        Open Modal
        </Button>
        </div>
            <Button 
            variant="primary"
            isLoading={isFetching || loading}
            onClick={handleFetch}
            >
              Click me!
            </Button>
        </div>
        <Table 
        className="mt4 dib c-emphasis"
        fullWidth
        schema={defaultSchema}
        toolbar={ {
          inputSearch: {
            placeholder: "Search by name"
          }
        } }
        items={defaultItems}
        />
        <Modal
        centered 
        showBottomBarBorder={false}
        isOpen={isOpen}
        onClose={handleToggle}
        >
<TestModal />
        </Modal>

      </PageBlock>
    </Layout>
  )
}


export default Management

const TestModal = () => {
  return( 
         < >
            <p>
              The Payments module is the system responsible for managing all
              actions regarding your store's cash flow.
            </p>

            <p>
              Before we explore the features within VTEX Admin Payments, let's
              clarify some important concepts regarding the payment flow of an
              order. This process is performed by some actors within the
              Brazilian financial system, which make up the Payments module
              architecture.
            </p>
            <div
              style={{
                backgroundColor: '#edf4fa',
                borderRadius: '4px',
                border: 'solid #368df7',
                borderWidth: '0 0 0 4px',
                boxSizing: 'border-box',
                padding: '12px 16px',
              }}>
              It is important to remember that each store has its own
              particularities and its own operation, which influence how to
              build your business' Payment module. To set up your cash flow, it
              is therefore crucial to keep in mind the real needs and purposes
              of the retailer and of the desired project.
            </div>
          </ >
  )
}