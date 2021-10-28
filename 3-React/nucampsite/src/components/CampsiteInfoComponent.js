import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Label,
  Form,
} from "reactstrap";
import { Control, LocalForm, Errors } from "react-redux-form";
import { Link } from "react-router-dom";
import { Loading } from "./LoadingComponent";

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;
class CommentForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: false,
    };

    this.toggleModal = this.toggleModal.bind(this);
  }
  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  }

  handleReview = (values) => {
    alert(
      `rating: ${values.rating} author: ${values.author} comment: ${values.text}`
    );
    this.toggleModal();
  };
  handleSubmit(values) {
    this.toggleModal();
    this.props.addComment(
      this.props.campsiteId,
      values.rating,
      values.author,
      values.text
    );
    // console.log("Current state is: " + JSON.stringify(values));
    // alert("Current state is: " + JSON.stringify(values));
  }
  render() {
    return (
      <div>
        <Button outline onClick={this.toggleModal}>
          <i className="fa fa-pencil fa-lg" />
          Submit Comment
        </Button>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
              <div className="form-group">
                <Label htmlFor="rating" md={8}>
                  Rating
                </Label>

                <Control.select
                  model=".rating"
                  id="rating"
                  name="rating"
                  placeholder="Rating"
                  className="form-control"
                >
                  <option defaultValue="1">1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </Control.select>
              </div>

              <div className="form-group">
                <Label htmlFor="author" md={8}>
                  Your Name {""}
                </Label>

                <Control.text
                  model=".author"
                  id="author"
                  name="author"
                  placeholder="Author"
                  className="form-control"
                  validators={{
                    required,
                    minLength: minLength(2),
                    maxLength: maxLength(15),
                  }}
                />
                <Errors
                  className="text-danger"
                  model=".author"
                  show="touched"
                  component="div"
                  messages={{
                    required: "Required",
                    minLength: "Must be at least 2 characters",
                    maxLength: "Must be 15 characters or less",
                  }}
                />
              </div>
              <div className="form-group">
                <Label htmlFor="text" md={8}>
                  Comment
                </Label>

                <Control.textarea
                  model=".text"
                  id="text"
                  name="text"
                  rows="6"
                  className="form-control"
                />
              </div>
              <Button type="submit" value="submit" color="primary">
                Submit
              </Button>
            </LocalForm>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

function RenderCampsite({ campsite }) {
  return (
    <div className="col-md-5 m-1">
      <Card>
        <CardImg top src={campsite.image} alt={campsite.name} />
        <CardBody>
          {/* <CardTitle>{campsite.name}</CardTitle> */}
          <CardText>{campsite.description}</CardText>
        </CardBody>
      </Card>
    </div>
  );
}

function RenderComments({ comments, addComment, campsiteId }) {
  if (comments) {
    return (
      <div className="col-md-5 m-1">
        <h4>Comments</h4>
        {comments.map((comment) => (
          <div key={comment.id}>
            {comment.text}
            <pre></pre>
            {comment.author},
            {new Intl.DateTimeFormat("en-US", {
              year: "numeric",
              month: "short",
              day: "2-digit",
            }).format(new Date(Date.parse(comment.date)))}
          </div>
        ))}

        <CommentForm campsiteId={campsiteId} addComment={addComment} />
      </div>
    );
  }
  return <div></div>;
}
function CampsiteInfo(props) {
  if (props.isLoading) {
    return (
      <div className="container">
        <div className="row">
          <Loading />
        </div>
      </div>
    );
  }
  if (props.errMess) {
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <h4>{props.errMess}</h4>
          </div>
        </div>
      </div>
    );
  }
  if (props.campsite) {
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <Breadcrumb>
              <BreadcrumbItem>
                <Link to="/directory">Directory</Link>
              </BreadcrumbItem>
              <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
            </Breadcrumb>
            <h2>{props.campsite.name}</h2>
            <hr />
          </div>
        </div>
        <div className="row">
          <RenderCampsite campsite={props.campsite} />
          <RenderComments
            comments={props.comments}
            addComment={props.addComment}
            campsiteId={props.campsite.id}
          />
        </div>
      </div>
    );
  }
  return <div> </div>;
}

export default CampsiteInfo;
